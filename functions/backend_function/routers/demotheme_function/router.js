const express = require("express");
const demothemeRouter = express.Router();

const { getAboutPage, getContactPage, getDefaultPage } = require("../../controller/demotheme_function/demothemeController");

demothemeRouter.get("/about", getAboutPage);
demothemeRouter.get("/contact", getContactPage);
demothemeRouter.get("/", getDefaultPage);

module.exports = demothemeRouter;
