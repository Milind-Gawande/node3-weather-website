const request = require('request');

const forecast = (latitude, longitude, callback) => {
    // encodeURI component is used to convert special characters like ? to %3F to decode at server side.
    const url = `https://api.darksky.net/forecast/4ffb2dcd12bdc7f03d2f45cf343213db/${latitude},${longitude}`;
    request({url, json: true}, (error, {body})=>{
        if(error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degress out. There is a ${body.currently.precipProbability} %chance of rain`);
        }
    });
}

module.exports = forecast;