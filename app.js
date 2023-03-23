const { json } = require('stream/consumers');
const express = require('express');
const path = require('path');
const app = express()


const spawner = require('child_process').spawn;

const data_out = 'Send this to python script'
console.log('Data sent to python', data_out)
const python_process = spawner('python', ['./nba.py', data_out])
app.use(express.static(path.join(__dirname, 'public')))


python_process.stdout.on('data', (data) => {
    // An array that contains all the json information
    const output = JSON.parse(data)

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    

    app.get('/', (req, res) => {
        res.render('nba', { output })
    })



    app.listen(3000, () => {
        console.log('Serving on Port 3000')
    })
})

