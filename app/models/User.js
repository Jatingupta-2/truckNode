'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({

    VehicleNo:{
      type:String
    },
    Imei:{
      type:String
    },
    Location:{
      type:String
    },
    Date:{
      type:Date
    },
    Tempr:{
      type:Number
    },
    Ignition:{
      type:Number
    },
    Lat:{
      type:Number
    },
    Long:{
      type:Number
    },
    Speed:{
      type:Number
    },
    Angle:{
      type:Number
    }

 
  

})


mongoose.model('User', userSchema);