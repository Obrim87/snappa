Users
-
ID PK int FK
fname string
lname string
email string
dob date
password string
admin boolean

Games
-
ID PK int
date date
location string
team1_player1 int FK >- Users.ID
team1_player2 int FK >- Users.ID
team2_player1 int FK >- Users.ID
team2_player2 int FK >- Users.ID
team1_player1_tings int
team1_player2_tings int
team2_player1_tings int
team2_player2_tings int
team1_player1_sinks int
team1_player2_sinks int
team2_player1_sinks int
team2_player2_sinks int
team1_score int
team2_score int
winning_team string

Stats
-
ID PK int
user_id int FK >- Users.ID
game_id int FK >- Games.ID
tings int
sinks int
score int
win boolean
loss boolean

https://app.quickdatabasediagrams.com/#/d/6JBsT6