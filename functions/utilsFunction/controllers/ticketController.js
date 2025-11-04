var catalyst = require("zcatalyst-sdk-node");
const query = require("../SQL/query");
require("dotenv").config();
const pageSize = process.env.PAGE_SIZE;
// *************Common Functions***************

exports.ticketConnection = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "I am live" });
  } catch (error) {
    res.status(500).json({ success: false, message: "I am not live" });
  }
};

exports.createTicket = async (req, res) => {
  try {
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const formdata = req.body;
    const ticketData = await ticketParserData(formdata);
    const ticketResult = await adminApp
      .datastore()
      .table("tickets")
      .insertRow(ticketData);

    const ticketResp = {
      rowId: ticketResult?.ROWID ?? "",
      department: ticketResult?.department ?? "",
      contactId: ticketResult?.contactId ?? "",
      accountName: ticketResult?.accountName ?? "",
      email: ticketResult?.email ?? "",
      phone: ticketResult?.phone ?? "",
      subject: ticketResult?.subject ?? "",
      description: ticketResult?.description ?? "",
      status: ticketResult?.status ?? "",
      owner: ticketResult?.owner ?? "",
      productName: ticketResult?.productName ?? "",
      dueDate: ticketResult?.dueDate ?? "",
      ticketPriority: ticketResult?.ticketPriority ?? "",
      channel: ticketResult?.channel ?? "",
      language: ticketResult?.language ?? "",
      callifications: ticketResult?.callifications ?? "",
      leadId: ticketResult?.leadId ?? "",
    };

    res
      .status(200)
      .json({
        success: true,
        message: "ticket successfully created",
        ticketResp,
      });
  } catch (error) {
    res.status(409).json({ success: false, message: "ticket creation failed" });
  }
};
exports.updateTicket = async (req, res) => {
  try {
    const rowId = req.params.id;
    if (!rowId) {
      return res.status(400).json({ message: "Ticket ID is required" });
    }
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const formdata = req.body;
    const ticketData = await ticketParserData(formdata);
    const ticketResult = await adminApp
      .datastore()
      .table("tickets")
      .updateRow({ ...ticketData, ROWID: rowId });
    res
      .status(200)
      .json({
        success: true,
        message: "Ticket successfully Updated",
        rowId: ticketResult.ROWID,
      });
  } catch (error) {
    res.status(409).json({ success: false, message: "Ticket Updation failed" });
  }
};
exports.getTicketList = async(req,res)=>{
    const {page} = req.body;
    try{
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const pageInt = parseInt(page) || 1;
    const pageNo = (pageInt - 1) * pageSize;
    let ticketQuery = query.getAllTickets.replace("%LIMIT%", pageSize).replace("%OFFSET%", pageNo);
    const ticketResp=await  adminApp.zcql().executeZCQLQuery(`${ticketQuery}`); 
    // const ticketResp = await leadParserDb(response);
    res.status(200).json({success: true, message: "Ticket get Successfully",ticketResp});
    }
    catch(err){
      res.status(409).json({success: false, message: "Tickets get Issue", error:err});
    }
}

exports.deleteTicket = async (req, res) => {
  try {
    const rowId = req.params.id;
    if (!rowId) {
      return res.status(400).json({ message: "Ticket ID is required" });
    }
    const adminApp = catalyst.initialize(req, { scope: "admin" });
    const deletequery = query.deleteTickets.replace("%ROWID%", rowId);
    const deleteResp = await adminApp.zcql().executeZCQLQuery(deletequery);
    res
      .status(200)
      .json({
        success: true,
        message: "Ticket successfully deleted",
        deleteResp,
      });
  } catch (error) {
    res
      .status(409)
      .json({ success: false, message: "Tickets not deleted", error: error });
  }
};
// ***************PARSER TICKET DATA ******************
async function ticketParserData(formdata) {
  return {
    department: formdata?.department ?? "",
    contactId: formdata?.contactId ?? null,
    accountName: formdata?.accountName ?? "",
    email: formdata?.email ?? "",
    phone: formdata?.phone ?? null,
    subject: formdata?.subject ?? "",
    description: formdata?.description ?? "",
    status: formdata?.status ?? "",
    owner: formdata?.owner ?? null,
    productName: formdata?.productName ?? "",
    dueDate: new Date(formdata?.dueDate) ?? null,
    ticketPriority: formdata?.ticketPriority ?? "",
    channel: formdata?.channel ?? "",
    language: formdata?.language ?? "",
    callifications: formdata?.callifications ?? "",
    leadId: formdata?.leadId ?? null,
  };
}
