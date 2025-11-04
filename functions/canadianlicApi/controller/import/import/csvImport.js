const catalyst = require("zcatalyst-sdk-node");
const xlsx = require("xlsx");
const fs = require('fs');
const path = require('path');

const leadTemplate = require("./dbSchema/leads");
const leadInformationsTemplate = require("./dbSchema/leadInformations");
const leadsDescriptionTemplate = require("./dbSchema/leadsDescription");
const leadServiceTemplate = require("./dbSchema/leadService");
const leadConversionHistoryTemplate = require("./dbSchema/leadConversionHistory");

exports.testCsvConnections = async (req, res) => {
    res.status(200).json({ success: true, message: "I Am Live !!!" });
}
exports.readExcelAndUpload  = async (req, res) => {
    try {
        const { bucketName, moduleName, email } = req.body;
        if (!bucketName) {
            return res.status(400).json({ success: false, message: "Bucket name is required" });
        }
        const fileData = req.files?.file?.[0];
        if (!fileData || (!fileData.originalname.endsWith(".xls") && !fileData.originalname.endsWith(".xlsx"))) {
            return res.status(400).json({ success: false, message: "Only .xls or .xlsx files are allowed" });
        }
        //  Read Excel File
        const workbook = xlsx.readFile(fileData.path);
        const sheetNames = workbook.SheetNames;
        console.log("Sheet Names Found:", sheetNames);
        //  Ensure both required sheets exist
        if (!sheetNames.includes("leads") || !sheetNames.includes("leadInformations")) {
            throw new Error(`Missing required sheets: 'leads' and 'leadInformations'. Found: ${sheetNames.join(", ")}`);
        }

        //  Extract Data from Sheets
        let leads = xlsx.utils.sheet_to_json(workbook.Sheets["leads"]);
        let leadInformations = xlsx.utils.sheet_to_json(workbook.Sheets["leadInformations"]);
        let leadsDescription = xlsx.utils.sheet_to_json(workbook.Sheets["leadsDescription"]);
        let leadService = xlsx.utils.sheet_to_json(workbook.Sheets["leadService"]);
        let leadConversionHistory = xlsx.utils.sheet_to_json(workbook.Sheets["leadConversionHistory"]);

        console.log("Extracted Leads Data:", leads);
        console.log("Extracted Lead Informations Data:", leadInformations);
        console.log("Extracted Lead leadsDescription Data:", leadsDescription);
        console.log("Extracted Lead leadsDescription Data:", leadService);

        //  Rename Headers
        leads = leads.map(row => renameHeaders(row, leadTemplate));
        leadInformations = leadInformations.map(row => renameHeaders(row, leadInformationsTemplate));
        leadsDescription = leadsDescription.map(row => renameHeaders(row, leadsDescriptionTemplate));
        leadService = leadService.map(row => renameHeaders(row, leadServiceTemplate));
        leadConversionHistory = leadConversionHistory.map(row => renameHeaders(row, leadConversionHistoryTemplate));

        //  Convert to CSV
        const leadsCsvPath = convertJsonToCsv(leads, "leads");
        const leadInformationsCsvPath = convertJsonToCsv(leadInformations, "leadInformations");
        const leadsDescriptionCsvPath = convertJsonToCsv(leadsDescription, "leadsDescription");
        const leadServiceCsvPath = convertJsonToCsv(leadService, "leadService");
        const leadConversionHistoryCsvPath = convertJsonToCsv(leadConversionHistory, "leadConversionHistory");

        //  Upload CSV to Zoho Catalyst Stratus
        const app = catalyst.initialize(req, { scope: "admin" });
        const stratus = app.stratus();
        let dataStore = app.datastore().table("dataRequest");

        const leadsUpload = await uploadToStratus(stratus, bucketName, leadsCsvPath, "leads.csv");
        const leadInformationsUpload = await uploadToStratus(stratus, bucketName, leadInformationsCsvPath, "leadInformations.csv");
        const leadsDescriptionUpload = await uploadToStratus(stratus, bucketName, leadsDescriptionCsvPath, "leadsDescription.csv");
        const leadServiceUpload = await uploadToStratus(stratus, bucketName, leadServiceCsvPath, "leadService.csv");
        const leadConversionHistoryUpload = await uploadToStratus(stratus, bucketName, leadConversionHistoryCsvPath, "leadConversionHistory.csv");

        const payload = {
            attachmentId: JSON.stringify({ leadsUpload, leadInformationsUpload, leadsDescriptionUpload,leadServiceUpload,leadConversionHistoryUpload }),
            moduleName: moduleName ?? "",
            bucketName: bucketName ?? "",
            email: email ?? ""
        };

        console.log("Upload Payload:", payload);
        const rowData = await dataStore.insertRow(payload);

        res.status(200).json({
            success: true,
            message: "File processed and uploaded successfully",
            result: { leadsUpload, leadInformationsUpload, leadsDescriptionUpload,leadServiceUpload,leadConversionHistoryUpload },
            ROWID: rowData.ROWID
        });

    } catch (error) {
        console.error("File Processing Error:", error);
        res.status(500).json({ success: false, message: "File processing failed", error: error.message });
    }
};

//  Rename Headers Based on Mapping
const renameHeaders = (row, template) => {
    const newRow = {};
    for (const [originalHeader, mappedHeader] of Object.entries(template)) {
        if (row.hasOwnProperty(originalHeader)) {
            newRow[mappedHeader] = row[originalHeader];
        }
    }
    return newRow;
};

//  Convert JSON to CSV
const convertJsonToCsv = (jsonData, fileName) => {
    const csvPath = path.join(__dirname, "../../temp/attachments", `${fileName}_${Date.now()}.csv`);
    const worksheet = xlsx.utils.json_to_sheet(jsonData);
    const csv = xlsx.utils.sheet_to_csv(worksheet);
    fs.writeFileSync(csvPath, csv);
    console.log(`✅ Converted ${fileName} to CSV:`, csvPath);
    return csvPath;
};

exports.importCsv = async (req, res) => {
    try {
        const { leadsFileId, leadInformationsFileId, leadsDescriptionFileId, leadServiceFileId, leadConversionHistoryFileId, ROWID } = req.body;

        if (!leadsFileId || !leadInformationsFileId) {
            return res.status(400).json({ success: false, message: "File IDs are required for leads and leadInformations" });
        }

        console.log(`Processing CSV files: leads (${leadsFileId}), leadInformations (${leadInformationsFileId}),leadsDescriptionFileId (${leadsDescriptionFileId}),leadServiceFileId (${leadServiceFileId}),leadConversionHistoryFileId (${leadConversionHistoryFileId})`);

        const app = catalyst.initialize(req, { scope: "admin" });
        const dataStore = app.datastore().table("dataRequest");

        //  File Details
        const leadsFileDetails = { bucket_name: "upload", object_key: leadsFileId };
        const leadInformationsFileDetails = { bucket_name: "upload", object_key: leadInformationsFileId };
        const leadsDescriptionFileDetails = { bucket_name: "upload", object_key: leadsDescriptionFileId };
        const leadServiceFileDetails = { bucket_name: "upload", object_key: leadServiceFileId };
        const leadConversionHistory = { bucket_name: "upload", object_key: leadConversionHistoryFileId };

        //  Initialize Bulk Write Jobs
        const leadsBulkWrite = app.datastore().table("leads").bulkJob("write");
        const leadInformationsBulkWrite = app.datastore().table("leadInformations").bulkJob("write");
        const leadsDescriptionBulkWrite = app.datastore().table("leadsDescription").bulkJob("write");
        const leadServiceBulkWrite = app.datastore().table("leadService").bulkJob("write");
        const leadConversionHistoryBulkWrite = app.datastore().table("leadConversionHistory").bulkJob("write");

        //  Options for Bulk Write
        const leadsOptions = { operation: "insert" };
        const leadInformationsOptions = {
            operation: "insert",
            fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }]
        };
        const leadsDescriptionOptions = {
            operation: "insert",
            fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }]
        };
        const leadServiceOptions = {
            operation: "insert",
            fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }]
        };
        const leadConversionHistoryOptions = {
            operation: "insert",
            fk_mapping: [{ local_column: "leadId", reference_column: "leadID" }]
        };

        console.log("Starting Bulk Write for leads...");
        const { jobId: leadsJobId } = await bulkWriteRecords(leadsBulkWrite, leadsFileDetails, leadsOptions);
        console.log(`Leads Job ID: ${leadsJobId}`);

        console.log("Starting Bulk Write for leadInformations...");
        const { jobId: leadInformationsJobId } = await bulkWriteRecords(leadInformationsBulkWrite, leadInformationsFileDetails, leadInformationsOptions);
        console.log(`leadInformations Job ID: ${leadInformationsJobId}`);
        console.log("Starting Bulk Write for leadInformations...");
        const { jobId: leadsDescriptionJobId } = await bulkWriteRecords(leadsDescriptionBulkWrite, leadsDescriptionFileDetails, leadsDescriptionOptions);
        console.log(`leadsDescriptionJobId Job ID: ${leadsDescriptionJobId}`);
        const { jobId: leadServiceJobId } = await bulkWriteRecords(leadServiceBulkWrite, leadServiceFileDetails, leadServiceOptions);
        console.log(`leadServiceJobId Job ID: ${leadServiceJobId}`);
        const { jobId: leadConversionHistoryJobId } = await bulkWriteRecords(leadConversionHistoryBulkWrite, leadConversionHistory, leadConversionHistoryOptions);
        console.log(`leadConversionHistoryJobId Job ID: ${leadConversionHistoryJobId}`);

        // ✅ Monitor Bulk Job Status
        const jobStatus = await new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const leadsJobResult = await checkStatusPeriodically(leadsBulkWrite, leadsJobId);
                    const leadInformationsJobResult = await checkStatusPeriodically(leadInformationsBulkWrite, leadInformationsJobId);
                    const leadsDescriptionJobResult = await checkStatusPeriodically(leadsDescriptionBulkWrite, leadsDescriptionJobId);
                    const leadServiceJobResult = await checkStatusPeriodically(leadServiceBulkWrite, leadServiceJobId);
                    const leadConversionHistoryJobResult = await checkStatusPeriodically(leadConversionHistoryBulkWrite, leadConversionHistoryJobId);

                    console.log(`Leads Job Status: ${JSON.stringify(leadsJobResult)}`);
                    console.log(`LeadInformations Job Status: ${JSON.stringify(leadInformationsJobResult)}`);
                    console.log(`leadsDescriptionJobResult Job Status: ${JSON.stringify(leadsDescriptionJobResult)}`);
                    console.log(`leadServiceJobResult Job Status: ${JSON.stringify(leadServiceJobResult)}`);
                    console.log(`leadConversionHistoryJobResult Job Status: ${JSON.stringify(leadConversionHistoryJobResult)}`);

                    if (leadsJobResult.status === "completed" && leadInformationsJobResult.status === "completed" && leadsDescriptionJobResult.status === "completed" && leadServiceJobResult.status === "completed" && leadConversionHistoryJobResult.status === "completed"){
                        console.log("Import Jobs Completed Successfully!");

                        await updateDatastore(dataStore, { ROWID, status: "completed" });

                        res.status(200).json({
                            success: true,
                            message: "Leads & LeadInformations Import Successful!",
                            jobIds: [leadsJobId, leadInformationsJobId, leadsDescriptionJobId, leadServiceJobId, leadConversionHistoryJobId]
                        });

                        resolve("completed");
                    } else {
                        console.error("Import Job Failed:", { leadsJobResult, leadInformationsJobResult,leadsDescriptionJobResult, leadServiceJobResult,leadConversionHistoryJobResult });
                        reject(new Error("CSV import failed"));
                    }
                } catch (error) {
                    console.error("Error Checking Job Status:", error);
                    reject(error);
                }
            }, 5000);
        });

        console.log("Final Job Status:", jobStatus);
    } catch (error) {
        console.error("Import failed:", error);
        return res.status(500).json({ success: false, message: "Import failed", error: error.message });
    }
};

const uploadToStratus = async (stratus, bucketName, filePath, originalName) => {
    const bucket = stratus.bucket(bucketName);
    const fileStream = fs.createReadStream(filePath);
    const uniqueKey = `${Date.now()}-${originalName}`;
    const result = await bucket.putObject(uniqueKey, fileStream);
    return { id: uniqueKey, name: originalName, filePath: result.url, bucket: bucketName };
};


async function bulkWriteRecords(bulkWrite, fileDetails, options){
    // const options = options;
    console.log("options--->",options);
    // const options = {
    //     operation: "insert",
    //     fk_mapping: foreignKeyMappings 
    // };
    const bulkWriteJob = await bulkWrite.createJob(fileDetails, options);
    console.log("🔄 Bulk write job created:", JSON.stringify(bulkWriteJob));

    return { jobId: bulkWriteJob.job_id, status: bulkWriteJob.status };

};
// //<<<<<<<<<<<<======= CHECK JOB STATUS =========>>>>>>>>>>>>
async function checkStatusPeriodically(app, jobId) {
    const MAX_RETRIES = 30;  // Maximum retries (30 retries * 5 sec = 150 seconds)
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
