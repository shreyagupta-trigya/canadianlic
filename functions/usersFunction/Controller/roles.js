const catalyst = require("zcatalyst-sdk-node");
const queries = require("../SQL/role");
exports.roleTest = async (req, res) => {
    res.status(200).json({ success: true, message: "I am Live and Ready from Role Test controller." });
};

exports.getAllRoles = async (req, res) => {
    const query = queries.getAllRoles;
    const appAdmin = catalyst.initialize(req, { scope: "admin" });
    try {
        const result = await appAdmin.zcql().executeZCQLQuery(query);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Issue pulling user data",
            error: error.message,
        });
    }
}
exports.createRole = async (req, res) => {
    const {role} = req.body;
    const payload = {
        roleDetails: role,
    }

    try {   
        const result = await catalyst
            .initialize(req, { scope: "admin" })
            .datastore()
            .table("roles")
            .insertRow(payload);
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
};
exports.updateRole = async (req, res) => {
    const id = req.params.id;
    const {role} = req.body;
    const payload = {
        roleDetails: role,
        ROWID: id,
    }

    try {   
        const result = await catalyst
            .initialize(req, { scope: "admin" })
            .datastore()
            .table("roles")
            .updateRow(payload);
            res.status(201).json({
                success: true,
                message: "User Role Update successfully",
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
};