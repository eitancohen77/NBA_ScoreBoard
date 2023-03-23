const { json } = require('stream/consumers');

const spawner = require('child_process').spawn;

const data_out = 'Send this to python script'
console.log('Data sent to python', data_out)
const python_process = spawner('python', ['./nba.py', data_out])

let json_data = []
python_process.stdout.on('data', (data) => {
    const output = JSON.parse(data)
    console.log('Data recieved from python script', output)
})
