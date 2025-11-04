const catalyst = require("zcatalyst-sdk-node");
const csv  = require('csv-parser');
// const axios = require('axios');
const fs = require('fs');
const path = require('path');
// const { parse } = require("json2csv");
// const pipeline = promisify(require('stream').pipeline);
// const { TransferManager } = require('zcatalyst-sdk-node/lib/stratus');

const leadTemplate = require("./dbSchema/leads");
const testTemplate = require("./dbSchema/test");

exports.testCsvConnections = async (req, res) => {
    res.status(200).json({ success: true, message: "I Am Live !!!" });
}

exports.processAndUploadCSV = async (req, res) => {
    let processedFilePath;
    try {
        const { moduleName, bucketName, email } = req.body;
        if (!bucketName) {
            return res.status(400).json({ 
                success: false, 
                message: "Bucket name is required" 
            });
        }
        // console.log("Bucket name", req.files);
        const fileData = req.files?.file?.[0];
        if (fileData.mimetype !== "text/csv" && !fileData.originalname.endsWith(".csv")) {
            return res.status(400).json({
                success: false,
                message: "Only .csv files are allowed",
            });
        }
        if (!fileData) {
            return res.status(400).json({ 
                success: false, 
                message: "No file uploaded" 
            });
        }
        processedFilePath = await processCSV(moduleName,fileData.path);
        const app = catalyst.initialize(req, { scope: "admin" });
        let dataStore = app.datastore().table('dataRequest');

        const fileForUpload = {
            path: processedFilePath,
            originalname: `processed_${fileData.originalname}`
        };
       const stratus =  app.stratus()
       const response = await uploadToStratus(stratus, bucketName,  [fileForUpload]);
       const payload =  {
        attachmentId:JSON.stringify(response),
        moduleName:moduleName??"",
        bucketName:bucketName??"",
        email:email??"",
       }
        //console.log("payload--->", payload);
       const rowData = await dataStore.insertRow(payload);
       if (rowData.ROWID) {
            response.ROWID = rowData?.ROWID;
        }
        res.status(200).json({
            success: true,
            message: "File processed and uploaded successfully",
            result: response,
            ROWID:rowData.ROWID
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "File processing failed",
            error: error.message
        });
    }
};
exports.importCsv = async (req, res) => {
    const { moduleName, fileId, ROWID } = req.body;
    const templateName = 
        moduleName === "leads" ? leadTemplate :
        testTemplate;
    const tableName = 
        moduleName === "leads" ? "leads" :
        moduleName === "orders" ? "orders" :
        moduleName === "customers" ? "customers" : 
        "test";
    try {
        if (!fileId) {
            return res.status(400).json({ success: false, message: "File ID is required" });
        }
        const objectDetails = {
            "bucket_name": "uploads",
            "object_key": fileId
        };
        const app = catalyst.initialize(req, { scope: "admin" });
        const dataStore = app.datastore().table('dataRequest');
        const bulkWrite = app.datastore().table(tableName).bulkJob("write"); 

        const { jobId } = await bulkWriteRecords(bulkWrite, objectDetails, templateName);
        const jobStatus = await new Promise((resolve, reject) => { 
            setTimeout(async () => {
                try {
                    const result = await checkStatusPeriodically(bulkWrite, jobId); 
                    if (result.status.toLowerCase() === 'completed') {
                        resolve(result.status);
                        const status = result.status.toLowerCase();
                            res.status(200).json({success: true, message: "Job completed successfully!", jobId});
                        // console.log("Job completed successfully.");
                        await updateDatastore(dataStore, { ROWID, status });
                    } else if (result.status.toLowerCase() === 'failed') {
                        console.error("Job failed.",result);
                        reject(new Error("CSV import failed"));
                    }
                } catch (error) {
                    console.error("Error occurred:", error);
                    reject(error);
                }
            }, 5000);
        });
        console.log("Job Status", jobStatus);

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Import failed", 
            error: error.message 
        });
    }
};
async function uploadToStratus(stratus, bucketName, files) {
try {
    if (files.length === 0) {
        return [];
    }
    const bucket = stratus.bucket(bucketName);
    const uploadPromises = files.map(async (file) => {
        const filePath = file.path;
        const fileStream = fs.createReadStream(filePath);
        const uniqueKey = `${Date.now()}-${file.originalname}`;
        const result = await bucket.putObject(uniqueKey, fileStream);
        const fileUrl = `https://${bucketName}-development.zohostratus.com/${uniqueKey}`;
        return { id: uniqueKey, name: file.originalname, filePath: fileUrl, result,bucket: bucketName };
    });
    return await Promise.all(uploadPromises);
} catch (error) {
    console.error(`Error uploading files to bucket ${bucketName}:`, error);
    throw error;
}
}
async function processCSV(moduleName,inputPath) {
        const headerMapping = 
        moduleName === "leads" ? leadTemplate :
        testTemplate;
    const outputPath = path.join(__dirname, '../../temp/attachments', `processed_${Date.now()}.csv`);
    return new Promise((resolve, reject) => {
        const results = [];
        const writeStream = fs.createWriteStream(outputPath);

        // Process CSV
        fs.createReadStream(inputPath)
            .pipe(csv({
                mapHeaders: ({ header }) => headerMapping[header.trim()] || header
            }))
            .on('data', (data) => results.push(data))
            .on('end', () => {
                // Write processed headers
                if (results.length > 0) {
                    const headers = Object.keys(results[0]);
                    writeStream.write(`${headers.join(',')}\n`);
                }

                // Write processed data
                results.forEach(row => {
                    const formattedRow = Object.values(row).map(value => 
                        typeof value === "string" && value.includes(',') ? `"${value}"` : value
                    ).join(',');
                    
                    writeStream.write(`${formattedRow}\n`);
                    // writeStream.write(`${Object.values(row).join(',')}\n`);
                });

                writeStream.end(() => resolve(outputPath));
            })
            .on('error', reject);
    });
}

async function bulkWriteRecords(bulkWrite, fileDetails, template) {
    const options = {
        operation: "insert"
    }
    const bulkWriteJob = await bulkWrite.createJob(fileDetails, options);
    console.log("bulk write job--->", JSON.stringify(bulkWriteJob));
    return { jobId: bulkWriteJob.job_id, status: bulkWriteJob.status };
}
// //<<<<<<<<<<<<======= CHECK JOB STATUS =========>>>>>>>>>>>>
async function checkStatusPeriodically(app, jobId) {
    const MAX_RETRIES = 12;  // Maximum retries (12 retries * 5 sec = 60 seconds)
    let retryCount = 0;

    return new Promise((resolve, reject) => {
        const checkStatus = async () => {
            try {
                const statusResult = await app.getStatus(jobId);
                
                if (statusResult.status.toLowerCase() === 'completed') {
                    const downloadUrl = statusResult?.results?.download_url;
                    resolve({ status: "completed", url: downloadUrl });
                    return true; 
                } else if (statusResult.status.toLowerCase() === 'failed') {
                    console.error('Bulk read job failed.', statusResult);
                    resolve({ status: "failed" }); 
                    return true;
                } else {
                    console.log('Job is still processing. Checking again in 5 seconds.');
                    return false;
                }
            } catch (error) {
                reject(error);
                return true;
            }
        };

        const intervalId = setInterval(async () => {
            retryCount++;  // Increment retry count
            
            const isCompleted = await checkStatus();
            
            if (isCompleted) {
                clearInterval(intervalId);
            } else if (retryCount >= MAX_RETRIES) {
                clearInterval(intervalId);
                console.error('Job did not complete within the allowed time.');
                reject(new Error("Job timeout: CSV import took too long to complete.")); 
            }
        }, 5000);  // Check every 5 seconds
    });
}

async function updateDatastore(dataStore, payload) {
    try {
        const result = await dataStore.updateRow(payload);
        return result.ROWID;
    } catch (error) {
        console.error("Error updating datastore:", error);
        throw error;
    }
}
// exports.downloadStratus = async (req, res) => {
//     try{
//         const app = catalyst.initialize(req, {scope:"admin"});
//         // Get a stratus instance
//         // const bucket = app.storage().bucket("fileimport"); // Replace with your bucket name

//         // const transferManager = new TransferManager(bucket);
//         // console.log("----", transferManager);
//         const bucketName =  req?.body?.bucketName;
//         console.log("bicket name", bucketName);
//         const stratus = app.stratus();
//         const bucket = stratus.bucket(bucketName);
//         const buckets = await bucket.getDetails(); // get details of a given bucket
//         console.log("buckets", buckets);
//         res.status(200).json({success: true, message:"bucket details get successfully", buckets})
//     }catch(error){
//         res.status(404).json({ success: false, message:"File not found"});
//     }
// }


// exports.downloadCSV = async (req, res) => {
//     const { fileId } = req.body;
//     const downloadDir = path.join(__dirname, "../../../temp", `${fileId}.csv`);
    
//     try {
//         if (!fileId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "File ID is required"
//             });
//         }

//         // Initialize Catalyst
//         const app = catalyst.initialize(req, {scope:"admin"});
//         const filePath = path.join(downloadDir, `download_${Date.now()}.csv`);

//         // Ensure download directory exists
//         if (!fs.existsSync(downloadDir)) {
//             fs.mkdirSync(downloadDir, { recursive: true });
//         }

//         // Get file from Stratus
//         const stratus = app.stratus();
//         const bucket = stratus.bucket("fileimport");
        
//         // Get readable stream from Stratus
//         const downloadResponse = await bucket.getObject(fileId);

//         // Save file to local storage
//         await pipeline(
//             downloadResponse, // Use the download response stream
//             fs.createWriteStream(filePath)
//         );

//         // Respond using the original 'res' parameter
//         res.status(200).json({
//             success: true,
//             message: "File downloaded successfully",
//             path: filePath
//         });

//     } catch (error) {
//         console.error("Download failed:", error);
//         res.status(500).json({
//             success: false,
//             message: "File download failed",
//             error: error.message
//         });
//     }
// };

// exports.uploadCSV = async (req, res) => {
//     try {
//         const { fileId } = req.body; // Get fileId from request
//         if (!fileId) {
//             return res.status(400).json({ success: false, message: "File ID is required" });
//         }

//         console.log("File ID received:", fileId);
//         const app = catalyst.initialize(req, { scope: "admin" });

//         // Step 1: Retrieve file from Stratus
//         const folder = app.filestore().folder("fileimport");
//         const file = folder.file(fileId);

//         // Define local temp file path
//         const tempFilePath = path.join(__dirname, "../../../temp", `${fileId}.csv`);
//         const fileStream = fs.createWriteStream(tempFilePath);

//         await file.download(fileStream);
//         console.log(`File downloaded to: ${tempFilePath}`);

//         // Step 2: Process CSV file
//         const headerMapping = {
//             "Product Name": "productName",
//             "Description": "description",
//             "Price": "price",
//             "Stock Qty": "stockQty",
//         };

//         const results = [];
//         fs.createReadStream(tempFilePath)
//             .pipe(
//                 csv({ mapHeaders: ({ header }) => headerMapping[header] || header })
//             )
//             .on("data", (data) => results.push(data))
//             .on("end", async () => {
//                 console.log("Processed Data:", results);

//                 // Step 3: Save processed CSV file
//                 const newCsvPath = path.join(__dirname, "../../../temp/processed.csv");
//                 writeCsv(results, newCsvPath);

//                 res.status(200).json({
//                     success: true,
//                     message: "CSV Processed Successfully!",
//                     filePath: newCsvPath,
//                 });
//             });

//         function writeCsv(data, outputPath) {
//             if (!data.length) return;

//             const headers = Object.keys(data[0]);
//             const csvContent = [
//                 headers.join(","),
//                 ...data.map((row) => headers.map((h) => row[h]).join(",")),
//             ].join("\n");

//             fs.writeFileSync(outputPath, csvContent, "utf-8");
//             console.log(`Processed file saved to ${outputPath}`);
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error processing CSV file",
//             error: error.message,
//         });
//     }
// };


//beow code is working
// exports.uploadCSV = async (req, res) => {
//     try {
//         console.log("Received Files:", req.files); // Debugging

//         const fileData = req.files?.file?.[0]; // Access the uploaded file
//         if (!fileData) {
//             return res.status(400).json({ success: false, message: "No file uploaded" });
//         }

//         const filePath = fileData.path; // Use uploaded file path
//         console.log("File Path:", filePath); // Debugging

//         const headerMapping = {
//             "Product Name": "productName",
//             "Description": "description",
//             "Price": "price",
//             "Stock Qty": "stockQty",
//         };

//         const results = [];
//         fs.createReadStream(filePath)
//             .pipe(
//                 csv({ mapHeaders: ({ header }) => headerMapping[header] || header }) // ✅ Fixed: csv-parser is defined
//             )
//             .on("data", (data) => results.push(data))
//             .on("end", () => {
//                 console.log("Processed Data:", results);

//                 // Write to a new CSV file
//                 const newCsvPath = path.join(__dirname, "../../../temp/new.csv");
//                 writeCsv(results, newCsvPath);

//                 res.status(200).json({
//                     success: true,
//                     message: "CSV Processed Successfully!",
//                     filePath: newCsvPath,
//                 });
//             });

//         function writeCsv(data, outputPath) {
//             if (!data.length) return;

//             const headers = Object.keys(data[0]);
//             const csvContent = [
//                 headers.join(","),
//                 ...data.map((row) => headers.map((h) => row[h]).join(",")),
//             ].join("\n");

//             fs.writeFileSync(outputPath, csvContent, "utf-8");
//             console.log(`File saved to ${outputPath}`);
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error processing CSV file",
//             error: error.message,
//         });
//     }
// };
