'use strict';

const express = require("express");
const catalyst = require("zcatalyst-sdk-node");
const bcrypt = require('bcryptjs');
const router = express.Router();
const dotenv = require('dotenv')
dotenv.config();

const generateNumericOTP = require("../otpGenerator")
// Importing twillio details fron .env file
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_VERIFY_SID = process.env.TWILIO_VERIFY_SID
const twilioClientPhoneNumber = process.env.twilioClientPhoneNumber;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

// Function to send invitation email with temporary password
async function sendInvitationEmail(req, userEmail, tempPassword) {
    const email = catalyst.initialize(req, { scope: 'admin' }).email();
    const config = {
        from_email: process.env.ADMIN_Email,
        to_email: userEmail,
        subject: 'Invitation to the System',
        content: ` Welcome to canadian LIC Your temporary password is: ${tempPassword} `
    };
    // Sending the email
    await email.sendMail(config);
}
// Route:1 Signup user
router.post('/signup', async (req, res) => {
     
    try {
        let { userName, userEmail, userPassword } = req.body;
        userEmail = userEmail.trim();
        userPassword = userPassword.trim()
        // Check if user already exists in userSignupData table
        const oldUserQuery = `SELECT userEmail FROM userSignupData WHERE userEmail='${userEmail}'`;
        const oldUser = await catalyst.initialize(req, { scope: "admin" }).zcql().executeZCQLQuery(oldUserQuery);

        // Check if user exists
        if (oldUser.length !== 0) {
            return res.status(200).json({ success: false, existingUser: true, message: "User already exists" });
        }
        
        
        const securePassword = await bcrypt.hash(userPassword,10);

        // Insert the new user data into userSignupData and userData tables
        await catalyst.initialize(req, { scope: "admin" }).datastore().table("userSignupData").insertRow({
            userName: userName,
            userEmail: userEmail,
            userPassword: securePassword,
            isFirstLogin: false
        });
        await catalyst.initialize(req, { scope: "admin" }).datastore().table("userData").insertRow({           
            email: userEmail,
        });

        // Return success response to user
        return res.status(201).json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ success: false, message: "Failed to create user", error: error.message });
    }
});

// Route:2 Login user
router.post('/login', async (req, res) => {
    try {
        let { userEmail, userPassword } = req.body;
        userEmail = userEmail.trim();
        userPassword = userPassword.trim()

        // Fetch user from database using zcql       
        const query = `SELECT * FROM userSignupData WHERE userEmail='${userEmail}'`
        const existingUser = await catalyst.initialize(req, { scope: "admin" }).zcql().executeZCQLQuery(query);

        // Check if user exists
        if (existingUser.length === 0) {
            return res.status(400).json({ success: false, msg: "Invalid Credentials" });
        }

        const hashedPassword = existingUser[0].userSignupData.userPassword;
        // Compare passwords
        const passwordMatch = await bcrypt.compare(userPassword, hashedPassword);

        if (!passwordMatch) {
            return res.status(400).json({ success: false, msg: "Invalid Credentials" });
        }

        if (existingUser[0].userSignupData.isFirstLogin) {
            return res.status(200).json({ success: true, isFirstLogin: true, message: "Logedin Succesfully" });
        }

        // Return success to user
        return res.status(200).json({ success: true, isFirstLogin: false, message: "Logedin Succesfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Route:3 Reset user password redirected by Email and Signup
router.post('/resetpassword', async (req, res) => {
    try {
        let { userEmail, userOTP, userPassword } = req.body;
        userEmail = userEmail.trim();
        userOTP = userOTP.trim();
        userPassword = userPassword.trim()
          console.log(userEmail)
          console.log(userOTP)
          console.log(userPassword)
        // Fetch user from database using zcql       
        const query = `SELECT * FROM userSignupData WHERE userEmail='${userEmail}'`
        const existingUser = await catalyst.initialize(req, { scope: "admin" }).zcql().executeZCQLQuery(query);

        // Check if user exists
        if (existingUser.length === 0) {
            return res.status(400).json({ success: false, msg: "Invalid Credentials" });
        }

        const password = existingUser[0].userSignupData.userPassword;

        // Compare passwords
        const passwordMatch = await bcrypt.compare(userOTP, password);

        if (!passwordMatch) {
            return res.status(400).json({ success: false, msg: "Invalid Credentials" });
        }

        
        const hashedPassword = await bcrypt.hash(userPassword, 10);


        // Update user password in userSignupData table
        const updateQuery = `UPDATE userSignupData SET userPassword='${hashedPassword}', isFirstLogin=false WHERE userEmail='${userEmail}'`;
        await catalyst.initialize(req, { scope: "admin" }).zcql().executeZCQLQuery(updateQuery);

        // Return success to user
        return res.status(200).json({ success: true, message: "Password reset successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});



// Route:4  varify user email asfter login
router.post('/verify-email', async (req, res) => {
    try {
        let { userEmail, userOTP } = req.body;
        // Trim whitespace from userEmail and userOTP
        userEmail = userEmail.trim();
        userOTP = userOTP.trim();

        // Fetch user from database using zcql       
        const query = `SELECT * FROM tempPassword WHERE userEmail='${userEmail}'`
        const verifyOTP = await catalyst.initialize(req, { scope: "admin" }).zcql().executeZCQLQuery(query);
        console.log(verifyOTP)
        // Check if user exists
        if (verifyOTP.length === 0) {
            return res.status(400).json({ success: false, msg: "Invalid Credentials" });
        }

        //  varify existing tempPassword
        if (verifyOTP[0].tempPassword.userOTP != userOTP) {
            return res.status(400).json({ success: false, msg: "Invalid Credentials" });
        }

        // Fetch user from database using zcql       
        const verifyEmail = `UPDATE userData SET verifiedEmail=true WHERE email='${userEmail}'`;
        const verifiedUser = await catalyst.initialize(req, { scope: "admin" }).zcql().executeZCQLQuery(verifyEmail);

        // Delete OTP from tempPassword DB after verification
        const deleteQuery = `DELETE FROM tempPassword WHERE userEmail='${userEmail}'`;
        await catalyst.initialize(req, { scope: "admin" }).zcql().executeZCQLQuery(deleteQuery);
        // Return success to user
        return res.status(200).json({ success: true, message: "Email Verified Succesfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Route:5 Generate OTP Email
router.post('/send-otp', async (req, res) => {
    try {
        let userEmail = req.body.userEmail;

        userEmail = userEmail.trim()
        // Generate OTP
        const tempPassword = await generateNumericOTP()

        // Check if user already exists in tempPassword table
        const existingUser = await catalyst.initialize(req, { scope: "admin" })
            .zcql().executeZCQLQuery(`SELECT userEmail FROM tempPassword WHERE userEmail='${userEmail}'`);

        if (existingUser.length > 0) {
            // Update OTP for existing user in tempPassword table
            await catalyst.initialize(req, { scope: "admin" })
                .zcql().executeZCQLQuery(`UPDATE tempPassword SET userOTP='${tempPassword}' WHERE userEmail='${userEmail}'`);

            // Send invitation email with updated temporary password
            await sendInvitationEmail(req, userEmail, tempPassword);

            return res.status(200).json({ success: true, message: "User already exists in tempPassword, OTP updated successfully" });
        }

        // User does not exist in tempPassword table, insert the new user data
        const newUser = {
            userOTP: tempPassword,
            userEmail: userEmail
        };

        // Insert the new user data into tempPassword table
        await catalyst.initialize(req, { scope: "admin" })
            .datastore().table("tempPassword").insertRow(newUser);

        // Send invitation email with temporary password
        await sendInvitationEmail(req, userEmail, tempPassword);

        // Return success response to user
        return res.status(201).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error generating OTP:", error);
        return res.status(500).json({ success: false, message: "Failed to generate OTP", error: error.message });
    }
});

//Route:6  API endpoint for sending OTP via SMS
router.post('/phone-otp', async (req, res) => {
    try {
        // Extract phone number from request body
        let { phoneNumber } = req.body;
        // Send the OTP via Twilio
        const verification = await client.verify.v2
            .services(TWILIO_VERIFY_SID)
            .verifications.create({ to: phoneNumber, channel: "sms" });

        console.log(verification.status); // Log the verification status

        // Prompt for OTP input
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        readline.question("Please enter the OTP:", async (otpCode) => {
            readline.close(); // Close readline interface
            try {
                // Verify the OTP
                const verification_check = await client.verify.v2
                    .services(TWILIO_VERIFY_SID)
                    .verificationChecks.create({ to: phoneNumber, code: otpCode });

                console.log(verification_check.status); // Log the verification check status

                // Return response
                return res.status(200).json({ success: true, message: 'OTP sent successfully' });
            } catch (error) {
                console.error('Error verifying OTP:', error);
                return res.status(500).json({ success: false, message: 'Failed to verify OTP' });
            }
        });
        
        
    } catch (error) {
        // Log and send error response
        console.error('Error sending OTP:', error);
        return res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
});


//Route 7  Endpoint to verify OTP
router.post('/verify-phone-otp', async (req, res) => {
    try {
        // Extract phone number and OTP from request body
        const { phoneNumber, otpCode, userEmail } = req.body;

        // Verify the OTP via Twilio
        const verificationCheck = await client.verify.services(TWILIO_VERIFY_SID).verificationChecks.create({ to: phoneNumber, code: otpCode });

        // Log the status and send success response
        console.log("Verification check status:", verificationCheck.status);
        if (verificationCheck.status === "approved") {
            // Once otp verified set verifiedPhone = true
            const verifyPhone = `UPDATE userData SET verifiedPhone = true, phone = '${phoneNumber}' WHERE email = '${userEmail}'`;
            //set verified user true in userDatabase
            const verifiedUser = await catalyst.initialize(req, { scope: "admin" }).zcql().executeZCQLQuery(verifyPhone);

            return res.status(200).json({ success: true, message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
    } catch (error) {
        // Log and send error response
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ success: false, message: 'Failed to verify OTP' });
    }
});


//Route:8 get user details from 
router.post('/getuserdata', async (req, res) => {
    try {
        const userEmail = req.body.userEmail;
        const getQuery = `SELECT * FROM userData WHERE email='${userEmail}'`;
        const response = await catalyst.initialize(req, { scope: 'admin' }).zcql().executeZCQLQuery(getQuery);

        // Check if response is empty (user not found)
        if (response.length === 0) {
            return res.status(404).json({ success: false, message: "User not found" });
        } else {
            // User found, return user data
            return res.status(200).json({ success: true, message: "User data", data: response[0] });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});

//Route:9 get user permission data

router.post('/get-auth-data', async (req, res) => {
    try {
        const email = req.body.userEmail;
        console.log(email);

        const getQuery = `SELECT userData.ROWID,userData.role,userData.email,userData.lastName,userData.firstName, appUsersRole.roleName, appUsersRole.permmisions FROM userData 
        LEFT JOIN appUsersRole ON userData.role=appUsersRole.ROWID 
        WHERE userData.email = '${email}'`;
        const response = await catalyst.initialize(req, { scope: 'admin' }).zcql().executeZCQLQuery(getQuery);
        
        // Assuming you want to send the response back to the client
        res.status(200).json({success:true,message:'User permissions data ',response});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({success:true, message:'User permissions data ',error: 'Internal Server Error' });
    }
});




module.exports = router;
