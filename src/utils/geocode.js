// Call the Forecast.js by passing the cordinates
// Get the Weather response Return

const request = require("request");
const forecast = require("./forecast.js");
const geocode = function (address, callback) {
  const geoCodeUrl = `http://api.positionstack.com/v1/forward?access_key=cbccef587624ae0bcb65f9b5a4f39058&query=${address}`;

  request({ url: geoCodeUrl, json: true }, (error, response) => {
    // console.log(error);
    //console.log(response)
    if (error) {
      callback("No Address Found", undefined);
    } else if (response.body.data.length === 0) {
      callback("No Address Found", undefined);
    } else {
      const latitude = response.body.data[0].latitude;
      const longitude = response.body.data[0].longitude;
      // console.log(response.body.data[0]);

      forecast(latitude, longitude, (err, res) => {
        //  console.log("hit");
        // console.log(res);
        // console.log("hot");
        if (err) {
          callback(err, undefined);
        } else {
          callback(undefined, res);
        }
      });
      // callback(undefined, { latitude: latitude, longitude: longitude });
    }
  });
};

module.exports = geocode;
