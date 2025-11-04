function getFileType(originalname) {
    if (originalname && typeof originalname === 'string') {
        const fileType = originalname.split(".").pop(); 
        return fileType
    } else {        
      
        return "txt"; 
    }
}

export default getFileType;
