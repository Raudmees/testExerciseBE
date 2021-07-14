const express = require('express');

const weatherApiController = require('../controllers/weather')


const router = express.Router();


router.get('/get-city/:city', weatherApiController.getCityData)

router.get('/get-all-cities', weatherApiController.getAllSavedCitiesAndTheirWeatherData)

router.post('/add-city', weatherApiController.addCityToDb)

router.delete('/delete-city/:id', weatherApiController.deleteCityFromDb)



module.exports = router;