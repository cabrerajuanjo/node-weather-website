const request = require('request');

const weatherstack = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=88e62991b0e1fa6641b993dff5eea7b1&query=' + location
    request({url, json: true}, (error, {body}) =>
    {
        if(error)
        {
            callback("No es posible conectarse con el servicio del tiempo", undefined)
        }else if (body.error != null)
        {
            callback("No es posible encontrar el lugar", undefined)
        }else
        {
            const {weather_descriptions, temperature, precip} = body.current
            const {query} = body.request
            const forecast = "It's currently " + weather_descriptions[0] + ". Current temperature is " + temperature + "ºC probability of rain is " + precip + "%."
            callback (undefined, {forecast, query})
            //console.log(response.body.current)
            //console.log ("La temperatura actual es " + temp + "ºC y la probabilidad de precipitación es " + probp + "%")
        }
    })
}

exports.weatherstack = weatherstack
