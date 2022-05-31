const express = require('express');
const path = require('path');
const forecast = require('./utils/forecast.js');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '../templates/views')

app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials((path.join(__dirname, '../templates/partials')))

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Wheather App',
        name: 'Juanjo'})
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Juanjo'})
})

app.get('/weather', (req, res) => {
    if (req.query.address)
    {

        forecast.weatherstack(req.query.address, (error, data) => {
            if (error) {
                return res.send({error})
            }else {
                res.send({forecast: data.forecast, location: data.query})
            }
        })
    }else
    {
        res.send
        ({
            error: "You must provide an address"
        })
    }

})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: 'Error 404',
        message: 'Help article',
        name: 'Juanjo'
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is help',
        title: 'Help',
        name: 'Juanjo'})
})
})


app.get('*', (req, res) => {
    res.render('notfound', {
        title: 'Error 404',
        message: 'Page',
        name: 'Juanjo'
})
})

app.listen(port, () => {
    console.log('listening on 3000')
})
