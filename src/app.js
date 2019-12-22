//New Git Commit
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));
const app = express();
const port = process.env.PORT || 3000;
//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

// set view engine to hbs (dependencies) to load dynamic content
app.set('view engine','hbs');
//to tell express where the template directory is i.e. for hbs file. By default it is a views directory.
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);
//set up static directory to serve
//serve the static page index.html, about.html, help.html using express.static
app.use(express.static(publicDirectoryPath));

// to render dynamic template engine in index.hbs file
// second argument in response render is object whose property
//can be accessible in  index.hbs file by enclosing two open/closing braces
//and the property inside it.
app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    });
});

app.get('/about',(req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    });
});

app.get('/help',(req, res)=>{
    res.render('help', {
        helpText: 'This is some helpful text',
        title:'Help',
        name:'Andrew Mead'
    });
});

/*Below get method wont invoke as we use express static above for index.html which has special meaning in express*/ 
// app.get('', (req, res)=>{
//     // send text below
//     // res.send('Hello express!');
//     res.send('<h1>Weather</h1>');
// });

// app.get('/help', (req, res)=>{
//     // res.send('Help Page');
//     // send object
//     // res.send({
//     //     name: 'Andrew',
//     //     age: 27
//     // });
//     //send array of objects.
//     res.send([{
//         name: 'Andrew'
//     },
//     {
//         name: 'Soul'
//     }
//     ]);
// });

// app.get('/about', (req, res)=>{
//     res.send('<h1>About</h1>');
// });

app.get('/weather', (req, res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
            if (error) {
                return res.send({error});
            }
            forecast(latitude, longitude, (error, data)=>{
                if (error) {
                    return res.send({error});
                }
               return res.send({
                    forecast: data,
                    location,
                    address: req.query.address
                })
            });
    });

});

app.get('/products', (req, res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help Article Not Found'
    })
});

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page Not Found'
    })
});

app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
});