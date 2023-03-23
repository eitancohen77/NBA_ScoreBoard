from nba_api.stats.endpoints import playercareerstats
from nba_api.live.nba.endpoints import scoreboard
import pandas as pd
import sys
import json



career = playercareerstats.PlayerCareerStats(player_id='203999')
df = career.get_data_frames()[0]
df['ppg'] = df['PTS']/df['GP']
df['apg'] = df['AST']/df['GP']
df['rpg'] = df['REB']/df['GP']
g = scoreboard.ScoreBoard()
data = g.get_dict()


array = []
games = data['scoreboard']['games']
is_active = ''
counter = 0
for i in games:
    home_score = 0
    away_score = 0
    home_team_name = i['homeTeam']['teamTricode']
    away_team_name = i['awayTeam']['teamTricode']
    """ home_score = i['homeTeam']['score']
    away_score = i['awayTeam']['score']
    if (i['gameStatusText'] != 'Final'):
        is_active = ' ---------ACTIVE GAME'
    else:
        is_active = ''
    array.append(home_team_name + ' has ' + str(home_score) + ' points, while the ' + str(away_team_name) + ' have ' + str(away_score) + str(is_active))"""

    array.append([home_team_name, away_team_name])
    counter += 1
input = sys.argv[1]
output = array
json_output = json.dumps(output)
print(json_output)
sys.stdout.flush()