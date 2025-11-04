module.exports = {
    getMail: `SELECT mails.*,userData.firstName,userData.lastName,userData.ROWID 
    FROM mails
    LEFT JOIN userData ON mails.sendBy = userData.ROWID
    ORDER BY CREATEDTIME DESC
    LIMIT %LIMIT% OFFSET %OFFSET%`,
    getMailList:`SELECT mails.*,userData.firstName,userData.lastName,userData.ROWID 
    FROM mails
    LEFT JOIN userData ON mails.sendBy = userData.ROWID
    WHERE status = %STATUS%
    ORDER BY CREATEDTIME DESC
    LIMIT %LIMIT% OFFSET %OFFSET%`,
    deleteMail:`DELETE FROM mails WHERE ROWID IN`,
    getMailByUser:`SELECT mails.*,userData.firstName,userData.lastName,userData.ROWID 
    FROM mails
    LEFT JOIN userData ON mails.sendBy = userData.ROWID
    WHERE mails.sendBy = %userId%
    ORDER BY CREATEDTIME DESC
    LIMIT %LIMIT% OFFSET %OFFSET%`
}