const mongoose = require('mongoose');


const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');

const check = require('../libs/checkLib')

var Distance = require('geo-distance');
/* Models */
const TruckModel = mongoose.model('User')



let getAllVehicle = (req, res) => {
    TruckModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Truck Controller: getAll', 10)
                let apiResponse = response.generate(true, 'Failed To Find ', 500, null)
                res.send(apiResponse)
            }
            else if (check.isEmpty(result)) {
                logger.error('null', 'Truck Controller: getAll', 10)
                let apiResponse = response.generate(true, 'No Truck found', 500, null)
                res.send(apiResponse)
            }
            else {

                let apiResponse = response.generate('false', 'All Details', 200, result)

                console.log(apiResponse)
                console.log(apiResponse.data[0].sentRequests)
                res.send(apiResponse);
            }
        })
}


let storeValue = (req, res) => {

    let create = (req, res) => {
        return new Promise((resolve, reject) => {


            // console.log(req.body)
            TruckModel.findOne({ 'Imei': req.body.Imei }, (err, retreivedDetails) => {
                if (err) {
                    logger.error(err.message, 'Truck Controller:Failed to create Vehicle', 500, null)
                    let apiResponse = response.generate(true, 'Failed to create Vehicle', 500, null);
                    return apiResponse;
                }
                else if (check.isEmpty(retreivedDetails)) {



                    let newTruck = new TruckModel({
                        VehicleNo: req.body.VehicleNo,
                        Imei: req.body.Imei,
                        Location: req.body.Location,
                        Date: req.body.Date,
                        Tempr: req.body.Tempr,
                        Ignition: req.body.Ignition,
                        Lat: req.body.Lat,
                        Long: req.body.Long,
                        Speed: req.body.Speed,
                        Angle: req.body.Angle

                    })

                    newTruck.save((err, result) => {
                        if (err) {
                            logger.error(err.message, 'TruckController:Failed to create Vehicle', 10)
                            let apiResponse = response.generate(true, 'Failed to create Vehicle', 500, null);
                            reject(apiResponse);
                        }
                        else {
                            let newObj = result.toObject();
                            resolve(newObj);
                        }
                    })




                }
                else {
                    logger.error('', 'TruckController: Failed to create Vehicle', 10)
                    let apiResponse = response.generate(true, 'Vehicle already exists', 403, null)
                    reject(apiResponse)
                }
            })

        })
    }

    create(req, res)

        .then((resolve) => {


            let apiResponse = response.generate(false, 'Vehicle created', 200, resolve)
            console.log(apiResponse)
            res.send(apiResponse);
        })
        .catch((err) => {
            console.log(err);

            res.send(err)
        })



}

let calculateDistance = (req, res) => {



    let calculateDist = (req, res) => {
        return new Promise((resolve, reject) => {


            TruckModel.findOne({ 'VehicleNo': req.body.VehicleNo }, (err, retreivedDetails) => {
                if (err) {
                    logger.error(err.message, 'TruckController:Create Truck', 500, null)
                    let apiResponse = response.generate(true, 'Failed to create', 500, null);
                    return apiResponse;
                }
                else {
                    console.log(req.body.VehicleNo)

                    var a = {
                        lat: req.body.Lat,
                        lon: req.body.Long
                    };
                    var b = {
                        lat: retreivedDetails.Lat,
                        lon: retreivedDetails.Long
                    };
                    var dist = Distance.between(a, b);

                    console.log('' + dist.human_readable());
                    resolve(dist.human_readable())

                }

            })



        })
    }

    calculateDist(req, res)
        .then((resolve) => {


            let apiResponse = response.generate(false, 'Vehicle created', 200, resolve)
            console.log(apiResponse)
            res.send(apiResponse);
        })
        .catch((err) => {
            console.log(err);

            res.send(err)
        })

}




module.exports = {
    storeValue: storeValue,
    calculateDistance: calculateDistance,
    getAllVehicle: getAllVehicle


}// end exports