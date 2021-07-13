const OpenWeatherMapHelper = require("openweathermap-node");

const helper = new OpenWeatherMapHelper({
    APPID: "2ecf238acbc646578e8f921531765445",
    units: "metric",
  });

module.exports = helper