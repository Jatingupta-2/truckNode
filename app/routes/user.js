const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}`;

   
    app.post(`${baseUrl}/create`, userController.storeValue);
    
    app.post(`${baseUrl}/distance`, userController.calculateDistance);

    app.get(`${baseUrl}/allVehicle`, userController.getAllVehicle);
    
    

}
