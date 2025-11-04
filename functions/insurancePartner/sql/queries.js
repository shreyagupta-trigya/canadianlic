module.exports={
    deleteinsurancepartner:`DELETE FROM insurencePartner where ROWID IN`,
    getinsurance:`SELECT insurencePartner.*,userData.lastName,
    userData.firstName FROM insurencePartner LEFT JOIN userData ON 
    userData.ROWID=insurencePartner.partnerOwner
    ORDER BY CREATEDTIME DESC  LIMIT %LIMIT% OFFSET `,  
    getinsuranceById:`SELECT * from insurencePartner WHERE ROWID =`
}