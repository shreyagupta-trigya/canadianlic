const express = require("express");
const productRouter = express.Router();
const {
  createOffering,
  getAllOfferings,
  getSingleProduct,
  updateProduct,
  deleteOffering,
  downloadFiles
} = require("../../controller/productFunction/productController");

productRouter.put("/createoffering", createOffering);
productRouter.post("/getallofferings/:id?", getAllOfferings);
productRouter.get("/getsingleproduct/:id", getSingleProduct);
productRouter.post("/updateproduct/:id?", updateProduct);
productRouter.delete("/deleteoffering/:id", deleteOffering);
productRouter.post("/download-files", downloadFiles);

module.exports = productRouter;
