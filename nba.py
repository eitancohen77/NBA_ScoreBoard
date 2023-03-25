from nba_api.live.nba.endpoints import scoreboard
import sys
import json

g = scoreboard.ScoreBoard()
data = g.get_dict()


array = []
games = data['scoreboard']['games']

for i in games:
    home_team_name = i['homeTeam']['teamTricode']
    away_team_name = i['awayTeam']['teamTricode']
    home_team_score = i['homeTeam']['score']
    away_team_score = i['awayTeam']['score']
    game_status = i['gameStatus']
    game_start_time = i['gameStatusText']

    # Adding the data into a list of dictionaries and then sending it to the javascript file
    array.append({
        'game_status': game_status,
        'game_start_time': game_start_time,
        'home_team': home_team_name, 
        'home_score': home_team_score,
        'away_team': away_team_name,
        'away_score': away_team_score
        })
    
input = sys.argv[1]
output = array
json_output = json.dumps(output)
print(json_output)
sys.stdout.flush()