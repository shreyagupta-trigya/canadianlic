module.exports={
    getMeetingQuery:`SELECT meeting.*   FROM meeting  ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET  %OFFSET%`,
    deleteMeeting:`DELETE FROM meeting WHERE ROWID IN`,
}