// Return the Forecast of the Given Latitude and Longitude

const request = require("request");

const forecast = function (latitude, longitude, callback) {
  const url1 = `http://api.weatherstack.com/current?access_key=5fb0abf59a6f5428d40a5c3ec6c55e81&query=${latitude},${longitude}`;
  //callback(undefined, "respnose");

  request({ url: url1, json: true }, (err, res) => {
    if (err) {
      callback(
        "Unable to Fetch the Temperature at the required Address",
        undefined
      );
    } else {
      //console.log(res);
      //const data = JSON.parse(res.body);
      const temperature = res.body.current.temperature;
      const feelslike = res.body.current.feelslike;
      // console.log(
      //   `It is currently ${temperature} degrees out. It feels like ${feelslike} degrees inside `
      // );
      callback(undefined, { temperature, feelslike });
    }

    // console.log(res.body.current);
  });
};
module.exports = forecast;
