import json

visceralranged = range(1, 41)

visceral = {}

for value in visceralranged: 
    if value < 10:
        visceral[value] = "nível normal"
    if value >= 10 and value <= 14:
        visceral[value] = "nĩvel alto"
    if value >= 15:
        visceral[value] = "nível muito alto"

with open("data/visceral.json", "w") as outfile:
    json.dump(visceral, outfile)