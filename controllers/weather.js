const helper = require("../OpenWeatherAPI")
const City = require("../models/city")
const Record = require("../models/recordPoint")

exports.getCityData = (req, res, next) => {
  const city = req.params.city

  helper.getCurrentWeatherByCityName(city, (err, currentWeather) => {
    try {
      if (!err) {
        res.status(200).json({
          currentWeather,
        })
      }
      if (err) {
        console.log(err)
        throw new Error(err.status)
      }
    } catch (error) {
        res.status(404).json({ message: 'City not found' })
    }
  });
};

exports.addCityToDb = async (req, res, next) => {
  const name = req.body.name
  const temperature = req.body.main.temp
  const windSpeed = req.body.wind.speed
  const humidity = req.body.main.humidity

  try {
    const city = new City({
      name: name
    })

    const response = await city.save()

    const record = new Record({
      temperature: temperature,
      windSpeed: windSpeed,
      humidity: humidity,
      belongsToCityId: response._id
    })

    await record.save()
    res.status(200).json({ message: "City saved to database" })

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err)
  }
};

exports.getAllSavedCitiesAndTheirWeatherData = async (req, res, next) => {
  try {
    const cities = await City.find({})
    const citiesWithRecords = await Promise.all(cities.map(async city => {
      const cityId = city._id
      const cityName = city.name
      const records = await Record.find({ belongsToCityId: cityId })
      city = { name: cityName, _id: cityId, records }
      return city
    }))
    console.log(citiesWithRecords)
    res.status(200).json({ citiesWithRecords })
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
};

exports.deleteCityFromDb = async (req, res, next) => {
  const cityId = req.params.id
  try {
    const city = await City.findByIdAndRemove(cityId)
    await Record.deleteMany({ belongsToCityId: cityId })
    res.status(200).json({ message: "City deleted from database", deletedCityId: city._id })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
};
