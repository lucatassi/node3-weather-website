const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
    //7f5a2710d03fd23644e94bb80a0718e5
    let url = 'https://api.darksky.net/forecast/7f5a2710d03fd23644e94bb80a0718e5/' + latitude + ',' + longitude
    //per avere i gradi centigradi
    url += '?units=si'
    //per avere il testo in italiano
    //url += '&language=it'
    console.log(url)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. The high is ' + body.daily.data[0].temperatureHigh + ' The low is ' + body.daily.data[0].temperatureLow + ' There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast