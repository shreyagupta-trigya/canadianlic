"use strict";
const express = require("express");
const cors = require("cors");
const catalyst = require("zcatalyst-sdk-node");
const  query =  require("./SQL/query");
const app = express();
app.use(express.json());
app.use(cors());
const generateNumericOTP = require("./otpGenerator");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

// Using express router
app.use("/app", require("./routes/userAuthentication"));
app.use("/verify", require("./routes/verifyUser"));

// <<<<<<<<<<======== ROUTER ==========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
app.use("/api/v1", require("./routes/router"));

dotenv.config();

// sendInvitationEmail function
async function sendInvitationEmail(req, userEmail, tempPassword) {
  const email = catalyst.initialize(req, { scope: "admin" }).email();
  const config = {
    from_email: process.env.ADMIN_Email,
    to_email: userEmail,
    subject: "Invitation to the System",
    content: `Your temporary password is: ${tempPassword} Click here to create new password ${process.env.Reset_Email_Link} `,
  };
  console.log("object-->", config);
  await email.sendMail(config);
}

app.put("/createuser", async (req, res) => {
  const user = req.body;

  // Generate OTP
  const tempPassword = await generateNumericOTP();

  // Check if user already exists based on email
  const query = `SELECT * FROM userData WHERE email='${user.email}'`;
  const existingUser = await catalyst
    .initialize(req, { scope: "admin" })
    .zcql()
    .executeZCQLQuery(query);

  if (existingUser.length > 0) {
    // If user already exists, return a message indicating user already exists
    return res
      .status(403)
      .json({ success: false, message: "User with this email already exists" });
  }

  // If user does not exist, proceed with creating the new user
  const newUser = {
    firstName: user.firstName,
    email: user.email,
    lastName: user.lastName,
    phone: user.phone,
    address1: user.address1,
    address2: user.address2,
    city: user.city,
    state: user.state,
    zip: user.zip,
    twitterHandle: user.twitterHandle,
    facebookAccount: user.facebookAccount,
    instagramAccount: user.instagramAccount,
    publicEmail: user.publicEmail,
    bio: user.bio,
    role: user.role,
    userRole: user.roleId, // add new fileld userRole 
    // roleId: user.roleId,
    status: "Active",
  };

  try {
    // Insert new user data into the userData table
    const result = await catalyst
      .initialize(req, { scope: "admin" })
      .datastore()
      .table("userData")
      .insertRow(newUser);

    handleUpdateAllocatedUser(user.role, true, req);

    const securePassword = await bcrypt.hash(tempPassword, 10);

    const userEmail = user.email;
    // Check if user already exists in userSignupData table
    const oldUserQuery = `SELECT userEmail FROM userSignupData WHERE userEmail='${userEmail}'`;
    const oldUser = await catalyst
      .initialize(req, { scope: "admin" })
      .zcql()
      .executeZCQLQuery(oldUserQuery);

    // Check if user exists
    if (oldUser.length !== 0) {
      // Update user password in userSignupData table
      const updateQuery = `UPDATE userSignupData SET userPassword='${securePassword}', isFirstLogin=true WHERE userEmail='${userEmail}'`;
      await catalyst
        .initialize(req, { scope: "admin" })
        .zcql()
        .executeZCQLQuery(updateQuery);
      // Send invitation email with temporary password
      await sendInvitationEmail(req, user.email, tempPassword);
      return res.status(200).json({
        success: true,
        existingUser: true,
        // message: "User already exists, login with one time password",
        message: "User password updated ...!!!!",
      });
    }else {
    // Insert new user data into userSignupData table
    const newUserEntry = {
      userName: `${user.firstName} ${user.lastName}`,
      userEmail: user.email.toLowerCase(),
      userPassword: securePassword,
      isFirstLogin: true,
    };
    await catalyst
      .initialize(req, { scope: "admin" })
      .datastore()
      .table("userSignupData")
      .insertRow(newUserEntry);

    // Send invitation email with temporary password
    await sendInvitationEmail(req, user.email, tempPassword);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      result,
    });
  }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(409).json({
      success: false,
      message: "Issue creating user",
      output: error,
    });
  }
});

app.get("/getallusers", (req, res) => {
  const query = `SELECT userData.*,appUsersRole.roleName FROM userData left JOIN appUsersRole ON userData.role=appUsersRole.ROWID`;
  catalyst
    .initialize(req, { scope: "admin" })
    .zcql()
    .executeZCQLQuery(query)
    .then((data) => {
      // console.log("This is left joinded data",data);
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error fetching user data",
        error: error.message,
      });
    });
});

app.get("/getsingleuser/:id", (req, res) => {
  console.log(req.params.id);

  const query = `SELECT * from userData WHERE ROWID=${req.params.id}`;

  catalyst
    .initialize(req, { scope: "admin" })
    .zcql()
    .executeZCQLQuery(query)
    .then((data) => {
      res.status(201).json({
        message: data.message,
        success: true,
        data,
      });
    })
    .catch((error) => {
      res.status(403).json({
        succuss: false,
        message: "Issue pulling user data",
        output: error,
      });
    });
});

app.post("/updateuser/:id", async (req, res) => {
  const user = req.body;
  const rowData = {
    firstName: user.firstName,
    email: user.email,
    password: user.password,
    lastName: user.lastName,
    phone: user.phone,
    address1: user.address1,
    address2: user.address2,
    city: user.city,
    state: user.state,
    zip: user.zip,
    twitterHandle: user.twitterHandle,
    facebookAccount: user.facebookAccount,
    instagramAccount: user.instagramAccount,
    publicEmail: user.publicEmail,
    bio: user.bio,
    role: user.role,
    roleId:user.roleId
  };
  const previousRole = await getPrevRole(req);

  console.log("This is prev role",previousRole);
  handleUpdateAllocatedUser(previousRole, false, req);
  handleUpdateAllocatedUser(user.role, true, req);

  rowData.ROWID = req.params.id;
  const catalystApp = catalyst.initialize(req, { scope: "admin" });
  catalystApp
    .datastore()
    .table("userData")
    .updateRow(rowData)
    .then((row) =>
      res.status(201).json({
        success: true,
        message: "Updated user successfully",
        output: row,
      })
    )
    .catch((error) =>
      res
        .status(409)
        .json({ success: false, message: "Updated Faild", output: error })
    );
});

app.post("/deleteusers", async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  

  catalyst
    .initialize(req, { scope: "admin" })
    .datastore()
    .table("userData")
    .deleteRow(id.id)
    .then((data) => {
      console.log(data);

      const deleteSignup = `DELETE FROM userSignupData WHERE userEmail='${req.body.id.email}' `;
      catalyst
        .initialize(req, { scope: "admin" })
        .zcql()
        .executeZCQLQuery(deleteSignup)
        .then((data) => {
         
          console.log(data);
        })
        .catch((err) => {
          console.log("it is inside the userSignUpData", err);
        });
      res.status(201).json({
        success: true,
        message: "user deleted successfully",
        data,
      });
    })
     
    .catch(error => {
      res.status(406).json({ succuss: false, message: 'Issue with deleting user', output: error })
    })
});

app.get("/getallModuleName", async (req, res) => {
  const query = `SELECT * FROM moduleName WHERE status = TRUE`;
  catalyst
    .initialize(req, { scope: "admin" })
    .zcql()
    .executeZCQLQuery(query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error fetching user data",
        error: error.message,
      });
    });
});

// app.get("create-app-user-role",(req,res)=>{
//   const data = {
//     ROWID: req.body.ROWID,
//     description: req.body.roleDescription,
//     permissions: req.body.status,
//     allocatedUsers:req.body.numberOfAllocatedUsers,
//   }
//   catalyst
//   .initialize(req, { scope: "admin" }).datastore().table('appUsersRole').insertRow(data)
//   .then((data) => {

//     res.status(200).json(data);
//   })
//   .catch((error) => {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching user data",
//       error: error.message
//     });
//   });
// })

const handleUpdateAllocatedUser = async (ROWID, increment, req) => {
  try {
    let incrementValue = increment ? 1 : -1; // Determine whether to increment or decrement
  console.log(ROWID,"This is the ROWID ")
  const oldAppUserRoleDataQuery=`SELECT * from appUsersRole WHERE ROWID = '${ROWID}'`
  const oldRoleData= await catalyst
    .initialize(req, { scope: "admin" })
    .zcql()
    .executeZCQLQuery(oldAppUserRoleDataQuery);


  // console.log("This is old Role Data",oldRoleData[0]);
  // console.log("This is old Role Data",oldRoleData[0].appUsersRole.allocatedUsers);

  const newAllocatedUser=parseInt(oldRoleData[0].appUsersRole.allocatedUsers) + incrementValue;

  console.log("newAllocatedUser",newAllocatedUser);
  const query = `UPDATE appUsersRole
                 SET allocatedUsers = ${newAllocatedUser}
                 WHERE ROWID = '${ROWID}'`;

  await catalyst
    .initialize(req, { scope: "admin" })
    .zcql()
    .executeZCQLQuery(query)
    .then((data) => {
      console.log(`Successfully updated allocatedUsers for role ${ROWID}`);
    })
    .catch((error) => {
      console.error(
        `Error updating allocatedUsers for role ${ROWID}: ${error.message}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

const getPrevRole=async (req)=>{
  const query = `SELECT * from userData WHERE ROWID=${req.params.id}`;

 const prevRole=await catalyst
    .initialize(req, { scope: "admin" })
    .zcql()
    .executeZCQLQuery(query)

    return prevRole[0].userData.role;
  
}
app.put('/createUserRole', async(req, res) =>{
  const formData = req.body;
// console.log("This is finalized formData",req.body);

  const usrRole = {
    roleName: formData.roleName,
    description: formData.description,
    createdBy: formData.createdBy,
    permmisions: formData.permmisions
  }

  try {   
    const result = await catalyst
      .initialize(req, { scope: "admin" })
      .datastore()
      .table("appUsersRole")
      .insertRow(usrRole);
      res.status(201).json({
        success: true,
        message: "User Role created successfully",
        result
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(409).json({
        success: false,
        message: "Issue creating user",
        output: error
      });
    }
});
app.get("/getAllUsersRole/:id?", (req, res) => {
  let query;
  if(req.params.id){
    query = `SELECT * FROM appUsersRole WHERE ROWID = ${req.params.id}`;
  } else {
    query = `SELECT appUsersRole.*, userData.firstName,userData.lastName FROM appUsersRole LEFT JOIN userData ON userData.ROWID = appUsersRole.createdBy`;
  }
  catalyst
    .initialize(req, { scope: "admin" })
    .zcql()
    .executeZCQLQuery(query)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error fetching user Role data",
        error: error.message,
      });
    });
});

app.post("/deleteUserRole/:id", async (req, res) => {
  catalyst
    .initialize(req, { scope: "admin" })
    .datastore()
    .table("appUsersRole")
    .deleteRow(req.params.id)
    .then((data) => {
      res.status(201).json({
        success: true,
        message: "User Role List deleted successfully",
      });
    })
    .catch((error) => {
      res.status(406).json({
        succuss: false,
        message: "Issue with deleting User Role List",
        output: error,
      });
    });
});
app.post("/updateUserRole/:id", async (req, res) => {
  // const createdBy = localStorage.getItem("userId");
  const { formData, description, userId, role } = req.body;
  const rowData = {
      roleName: role,
      description: description,
      createdBy: userId,
      permmisions: JSON.stringify(formData)
  };
  rowData.ROWID = req.params.id;
  // console.log("rowDatadddd=>", req.body)
  try {
      const catalystApp = catalyst.initialize(req, { scope: "admin" });
      const updatedRow = await catalystApp.datastore().table("appUsersRole").updateRow(rowData);
      res.status(201).json({
          success: true,
          message: "User Role updated successfully",
          output: updatedRow
      });
  } catch (error) {
      console.error(error);
      res.status(409).json({
          success: false,
          message: "Update failed",
          output: error
      });
  }
});

app.get("/getRole", (req, res) => {
  const roleQuery =  query.getUserRole;
  catalyst
    .initialize(req, { scope: "admin" })
    .zcql()
    .executeZCQLQuery(roleQuery)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error fetching user Role data",
        error: error.message,
      });
    });
});

module.exports = app;
