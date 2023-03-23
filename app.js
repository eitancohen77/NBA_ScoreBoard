const { json } = require('stream/consumers');
const express = require('express');
const path = require('path');
const { render } = require('ejs');
const app = express()


const spawner = require('child_process').spawn;

const data_out = 'Send this to python script'
console.log('Data sent to python', data_out)
const python_process = spawner('python', ['./nba.py', data_out])
app.use(express.static(path.join(__dirname, 'public')))


//Functions to send to the ejs files
function render_image(team_name) {
    if (team_name === 'ATL') {
        return 'https://loodibee.com/wp-content/uploads/nba-atlanta-hawks-logo.png'
    } else if (team_name === 'BOS') {
        return 'https://loodibee.com/wp-content/uploads/nba-boston-celtics-logo.png'
    } else if (team_name === 'BKN') {
        return 'https://loodibee.com/wp-content/uploads/nba-brooklyn-nets-logo.png'
    } else if (team_name === 'CHA') {
        return 'https://loodibee.com/wp-content/uploads/nba-charlotte-hornets-logo.png'
    } else if (team_name === 'CHI') {
        return 'https://loodibee.com/wp-content/uploads/nba-chicago-bulls-logo.png'
    } else if (team_name === 'CLE') {
        return 'https://loodibee.com/wp-content/uploads/nba-cleveland-cavaliers-logo.png'
    } else if (team_name === 'DAL') {
        return 'https://loodibee.com/wp-content/uploads/nba-dallas-mavericks-logo.png'
    } else if (team_name === 'DEN') {
        return 'https://loodibee.com/wp-content/uploads/nba-denver-nuggets-logo.png'
    } else if (team_name === 'DET') {
        return 'https://loodibee.com/wp-content/uploads/nba-detroit-pistons-logo.png'
    } else if (team_name === 'GSW') {
        return 'https://loodibee.com/wp-content/uploads/nba-golden-state-warriors-logo.png'
    } else if (team_name === 'HOU') {
        return 'https://loodibee.com/wp-content/uploads/nba-houston-rockets-logo.png'
    } else if (team_name === 'IND') {
        return 'https://loodibee.com/wp-content/uploads/nba-indiana-pacers-logo.png'
    } else if (team_name === 'LAC') {
        return 'https://loodibee.com/wp-content/uploads/nba-la-clippers-logo.png'
    } else if (team_name === 'LAL') {
        return 'https://loodibee.com/wp-content/uploads/nba-los-angeles-lakers-logo.png'
    } else if (team_name === 'MEM') {
        return 'https://loodibee.com/wp-content/uploads/nba-memphis-grizzlies-logo.png'
    } else if (team_name === 'MIA') {
        return 'https://loodibee.com/wp-content/uploads/nba-miami-heat-logo.png'
    } else if (team_name === 'MIL') {
        return 'https://loodibee.com/wp-content/uploads/nba-milwaukee-bucks-logo.png'
    } else if (team_name === 'MIN') {
        return 'https://loodibee.com/wp-content/uploads/nba-minnesota-timberwolves-logo.png'
    } else if (team_name === 'NOP') {
        return 'https://loodibee.com/wp-content/uploads/nba-new-orleans-pelicans-logo.png'
    } else if (team_name === 'NYK') {
        return 'https://loodibee.com/wp-content/uploads/nba-new-york-knicks-logo.png'
    } else if (team_name === 'OKC') {
        return 'https://loodibee.com/wp-content/uploads/nba-oklahoma-city-thunder-logo.png'
    } else if (team_name === 'ORL') {
        return 'https://loodibee.com/wp-content/uploads/nba-orlando-magic-logo.png'
    } else if (team_name === 'PHI') {
        return 'https://loodibee.com/wp-content/uploads/nba-philadelphia-76ers-logo.png'
    } else if (team_name === 'PHX') {
        return 'https://loodibee.com/wp-content/uploads/nba-phoenix-suns-logo.png'
    } else if (team_name === 'POR') {
        return 'https://loodibee.com/wp-content/uploads/nba-portland-trail-blazers-logo.png'
    } else if (team_name === 'SAC') {
        return 'https://loodibee.com/wp-content/uploads/nba-sacramento-kings.png'
    } else if (team_name === 'SAS') {
        return 'https://loodibee.com/wp-content/uploads/nba-san-antonio-spurs-logo.png'
    } else if (team_name === 'TOR') {
        return 'https://loodibee.com/wp-content/uploads/nba-portland-toronto-raptors-logo.png'
    } else if (team_name === 'UTA') {
        return 'https://loodibee.com/wp-content/uploads/nba-utah-jazz.png'
    } else if (team_name === 'WAS') {
        return 'https://loodibee.com/wp-content/uploads/nba-washington-wizards-logo.png'
    }
}
python_process.stdout.on('data', (data) => {
    // An array that contains all the json information
    const output = JSON.parse(data)

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    

    const renderImage = encodeURIComponent(render_image.toString())
    app.get('/', (req, res) => {
        res.render('nba', {renderImage: render_image,  output })
    })



    app.listen(3000, () => {
        console.log('Serving on Port 3000')
    })
})


