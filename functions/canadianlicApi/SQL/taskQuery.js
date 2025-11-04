module.exports={
    gettask:`SELECT tasks.*,userData.firstName,userData.lastName  FROM tasks
    left Join userData on tasks.owner=userData.ROWID ORDER BY CREATEDTIME DESC LIMIT %LIMIT% OFFSET  %OFFSET%`,
    deleteTask:`DELETE  FROM tasks WHERE ROWID IN`,
}