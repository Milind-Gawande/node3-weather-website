const request = require('request');

const geocode = (address, callback) => {
    // encodeURI component is used to convert special characters like ? to %3F to decode at server side.
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWlsaW5kMTMzNyIsImEiOiJjazN6bmJ4MnExd3p6M3Rtcml3b2s0Yzh5In0.dGLtkl9jGYrBcUu13M-xNQ&limit=1`;
    request({url, json: true}, (error, {body})=>{
        if(error) {
            callback('Unable to connect to location service', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;