module.exports = {
    referralListData: `SELECT referralData.*, userData.lastName,userData.ROWID,userData.firstName
    FROM referralData 
    LEFT JOIN userData ON referralData.referralOwner = userData.ROWID ORDER BY CREATEDTIME DESC LIMIT 300 OFFSET  %PAGENO% `,
    referralDataById: `SELECT referralData.*, userData.lastName,userData.ROWID,userData.firstName
    FROM referralData 
    LEFT JOIN userData ON referralData.referralOwner = userData.ROWID WHERE referralData.ROWID =`,
    getReferalScoreboard : `SELECT * FROM referralScoreGrid WHERE referralScoreGrid.referralDataId=`,

    referralLeadsData: `SELECT referralData.*,userData.lastName,userData.ROWID,userData.firstName,leads.firstName,leads.lastName,leads.mobile,leads.email
        FROM referralData
        LEFT JOIN userData ON referralData.referralOwner = userData.ROWID
        LEFT JOIN leads ON leads.ROWID = referralData.leadId
        WHERE referralData.leadId=%ROWID% ORDER BY CREATEDTIME DESC LIMIT 300 OFFSET  %PAGENO%`
}