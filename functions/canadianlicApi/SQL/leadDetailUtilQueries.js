module.exports = {
    getNote:`SELECT 
            notes.CREATEDTIME, notes.noteTitle, notes.addedBy, notes.ROWID, notes.description, notes.attachmentRowid, notes.attachmentOriginalname,notes.memeType, 
            userData.firstName,userData.lastName,userData.ROWID
        FROM notes
        LEFT JOIN userData ON notes.addedBy = userData.ROWID
        WHERE notes.moduleId=%moduleId% ORDER BY CREATEDTIME DESC`,
    getSingleNote:`SELECT 
        notes.CREATEDTIME, notes.noteTitle, notes.addedBy, notes.ROWID, notes.description, notes.attachmentRowid, notes.attachmentOriginalname,notes.memeType, 
        userData.firstName,userData.lastName,userData.ROWID
    FROM notes
    LEFT JOIN userData ON notes.addedBy = userData.ROWID
    WHERE notes.ROWID=%ROWID%`,
    getAttachments:`SELECT attachmentTxt,ROWID,moduleId,CREATEDTIME,userData.firstName,userData.lastName  
    FROM attachments 
    LEFT JOIN userData ON attachments.addedBy = userData.ROWID 
    WHERE moduleId=`,
    getAttachment:`SELECT attachmentTxt,ROWID,moduleId FROM attachments WHERE ROWID=`,

     // **************UTIL QUERY****************
     getAllLeads: `SELECT firstName,lastName,mobile, ROWID FROM leads LIMIT %LIMIT% OFFSET  %OFFSET%`,
     getUsers: `SELECT lastName,firstName,ROWID FROM userData LIMIT %LIMIT% OFFSET  %OFFSET%`,
     getLocation: `SELECT locationName,ROWID FROM locations LIMIT %LIMIT% OFFSET  %OFFSET%`,
     getContact: `SELECT firstName,lastName,ROWID FROM contacts LIMIT %LIMIT% OFFSET  %OFFSET%`,
     getreferralData: `SELECT referralName,ROWID FROM referralData LIMIT %LIMIT% OFFSET  %OFFSET%`,
     getAdviors: `SELECT firstName,lastName,ROWID FROM advisors LIMIT %LIMIT% OFFSET  %OFFSET%`,
     singleData: `SELECT * FROM %TABLE% WHERE ROWID = %ROWID%`,
     
    // ******* GET SARVEY LIST****
    getSurvayList:`SELECT zohoSurvay.*, userData.lastName,userData.firstName,userData.ROWID FROM zohoSurvay 
        LEFT JOIN userData ON userData.ROWID = zohoSurvay.owner 
        ORDER BY CREATEDTIME DESC
        LIMIT %LIMIT% OFFSET %OFFSET%`,
    getSurvayCount:`SELECT COUNT(ROWID) FROM zohoSurvay`,

    getAllTickets: `SELECT tickets.*,
        leads.firstName,leads.lastName,leads.email,leads.ROWID,
        userData.lastName,userData.firstName,userData.ROWID,
        contacts.firstName,contacts.lastName,contacts.ROWID
        FROM tickets 
        LEFT JOIN leads ON leads.ROWID= tickets.leadId
        LEFT JOIN userData ON userData.ROWID = tickets.owner 
        LEFT JOIN contacts ON contacts.ROWID = tickets.contactId
        LIMIT %LIMIT% OFFSET  %OFFSET%`,
    deleteTickets: `DELETE FROM tickets WHERE ROWID = %ROWID%`,

    // *********** GET TOTAL COUNT ***********
    getRemoteAccessCount:"SELECT COUNT(ROWID) FROM remoteAccess",
    getAllRemoteAccess: `SELECT remoteAccess.*,userData.lastName,userData.firstName,
        leads.firstName,leads.lastName,
        contacts.firstName,contacts.lastName
        FROM remoteAccess 
        LEFT JOIN userData ON userData.ROWID = remoteAccess.owner
        LEFT JOIN leads ON leads.ROWID = remoteAccess.leadId
        LEFT JOIN contacts ON contacts.ROWID = remoteAccess.contactId
        ORDER BY CREATEDTIME DESC
    LIMIT %LIMIT% OFFSET %OFFSET%`,
}


