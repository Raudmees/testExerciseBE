const helper = require('./OpenWeatherAPI')
const City = require("./models/city")
const Record = require('./models/recordPoint')

const cron = require("node-cron");

module.exports = () => {
  cron.schedule("0 */15 * * * *", async () => {
    try {
      const cities = await City.find({})
      cities.map((city) => {
        const cityName = replaceLetters(city.name)
        helper.getCurrentWeatherByCityName(cityName, async (err, currentWeather) => {
          if (err) {
            console.log(err);
          } else {
             const temperature = currentWeather.main.temp
             const windSpeed = currentWeather.wind.speed
             const humidity = currentWeather.main.humidity
             const cityId = city._id
            
            try {
              const record = new Record({
                temperature: temperature,
                windSpeed: windSpeed,
                humidity: humidity,
                belongsToCityId: cityId
              })

                record.save().then(res => {
                    console.log(res)
                })
            } catch (error) {
                
            }
          }
        })
      })
    } catch (error) {}
  })
}


function replaceLetters(string)
{
    let value = string.toLowerCase()
    value = value.replace(/ä/g, 'a')
    value = value.replace(/ö/g, 'o')
    value = value.replace(/ü/g, 'u')
    value = value.replace(/õ/g, 'o')
    return value
}