const catalyst = require("zcatalyst-sdk-node");
const productTemplate = require("./dbSchema/export/products");
const testTemplate = require("../../adminApp/csvImport/dbSchema/export/test");
const ordersTemplate= require("./dbSchema/export/order");
const customerTemplate= require("../../adminApp/csvImport/dbSchema/export/customers");

exports.exportData = async(req, res) => {
  const {moduleName, page } = req.body;
  if (!moduleName) {
    return res.status(400).json({
      success: false,
      message: "Module name is required for data export.",
    });
  }
  const templateName = moduleName === "product" ? productTemplate :moduleName === "orders" ? ordersTemplate : moduleName === "customers" ? customerTemplate : testTemplate ;
  const tableName = moduleName === "product" ? "products" : moduleName === "orders" ? "orders" : moduleName === "customers" ? "customers" : "test";
  try{
      // bulk read
      const app = catalyst.initialize(req, {scope:"admin"});
      const bulkRead = app.datastore().table(tableName).bulkJob('read');
      const bulkReadJob = await bulkRead.createJob({
          page: parseInt(page) || 1,
          select_columns: templateName,
      });
      // Get bulk read status
      const result = await handleJobStatus(bulkRead, bulkReadJob.job_id);
      const status = result.status.toLowerCase();
      if (status === 'completed' && result.url) {
          console.log(`Bulk read job completed. Download URL: ${result.url}`);
          return res.status(200).json({
              success: true,
              message: "Data export successful. Use the download URL to retrieve the CSV.",
              downloadUrl: result.url,
          });
      } else {
          throw new Error("Bulk read job failed or no download URL provided.");
      }
  }catch(error){
      res.status(404).json({ success: false, message:"Data not imported successfully", error: error});
  }
}
async function handleJobStatus(bulkJob, jobId, jobType = 'read') {
  return new Promise((resolve, reject) => {
      setTimeout(async () => {
          try {
              const result = await checkStatusPeriodically(bulkJob, jobId);
              const status = result.status.toLowerCase();
              // console.log(`${jobType} Job Status Result:`, result);
              if (status === 'completed') {
                  console.log(`${jobType} job completed successfully.`);
                  resolve(result);
              } else if (status === 'failed') {
                  console.error(`${jobType} job failed.`);
                  reject(new Error(`${jobType} job failed`));
              } else {
                  console.log(`${jobType} job status: ${status}`);
                  reject(new Error(`${jobType} job not completed or failed`));
              }
          } catch (error) {
              console.error("Error occurred during job status check:", error);
              reject(error);
          }
      }, 30000);
  });
}
async function checkStatusPeriodically(bulkJob, jobId) {
  const MAX_RETRIES = 28;
  let retryCount = 0;
  return new Promise((resolve, reject) => {
      const checkStatus = async () => {
          try {
              const statusResult = await bulkJob.getStatus(jobId);
              if (statusResult.status.toLowerCase() === 'completed') {
                  const downloadUrl = statusResult?.results?.download_url;
                  resolve({ status: "completed", url: downloadUrl });
                  return true;
              } else if (statusResult.status.toLowerCase() === 'failed') {
                  console.error('Bulk read job failed.', statusResult);
                  resolve({ status: "failed" });
                  return true;
              } else {
                  console.log('Job is still processing. Checking again in 30 seconds.');
                  return false;
              }
          } catch (error) {
              reject(error);
              return true;
          }
      };
      const intervalId = setInterval(async () => {
          retryCount++;
          const isCompleted = await checkStatus();
          if (isCompleted) {
              clearInterval(intervalId);
          } else if (retryCount >= MAX_RETRIES) {
              clearInterval(intervalId);
              // console.error('Job did not complete within the allowed time.');
              reject(new Error("Job timeout: CSV export took too long to complete."));
          }
      }, 30000);
  });
}