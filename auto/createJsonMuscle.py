import json

male = {}
female = {}

ages = range(18, 81)
values = [x / 10 for x in range(60, 550)]

# female
for age in ages:
    if age < 40:
        valuesUnder40 = {}
        for value in values:
            if value < 24.3:
                valuesUnder40[value] = "muito baixo"
            if value >= 24.3 and value <= 30.3:
                valuesUnder40[value] = "normal"
            if value >= 30.4 and value < 35.3:
                valuesUnder40[value] = "alto"
            if value > 35.3:
                valuesUnder40[value] = "muito alto"
        female[age] = valuesUnder40

    if age >= 40 and age <= 59:
        valuesOn40 = {}
        for value in values: 
            if value < 24.1:
                valuesOn40[value] = "muito baixo"
            if value >= 24.1 and value <= 30.1:
                valuesOn40[value] = "normal"
            if value >= 30.2 and value < 35.1:
                valuesOn40[value] = "alto"
            if value > 35.1:
                valuesOn40[value] = "muito alto"
        female[age] = valuesOn40

    if age >= 60 and age < 81 :
        valuesOn60 = {}
        for value in values: 
            if value < 23.9:
                valuesOn60[value] = "muito baixo"
            if value >= 23.9 and value <= 29.9:
                valuesOn60[value] = "normal"
            if value >= 30 and value < 34.9:
                valuesOn60[value] = "alto"
            if value > 34.9:
                valuesOn60[value] = "muito alto"
        female[age] = valuesOn60

# Male
for age in ages:
    if age < 40:
        valuesUnder40 = {}
        for value in values:
            if value < 33.3:
                valuesUnder40[value] = "muito baixo"
            if value >= 33.3 and value <= 39.3:
                valuesUnder40[value] = "normal"
            if value >= 39.4 and value < 44:
                valuesUnder40[value] = "alto"
            if value > 44:
                valuesUnder40[value] = "muito alto"
        male[age] = valuesUnder40

    if age >= 40 and age <= 59:
        valuesOn40 = {}
        for value in values: 
            if value < 33.1:
                valuesOn40[value] = "muito baixo"
            if value >= 33.1 and value <= 39.1:
                valuesOn40[value] = "normal"
            if value >= 39.2 and value < 43.8:
                valuesOn40[value] = "alto"
            if value > 43.8:
                valuesOn40[value] = "muito alto"
        male[age] = valuesOn40

    if age >= 60 and age < 81 :
        valuesOn60 = {}
        for value in values: 
            if value < 32.9:
                valuesOn60[value] = "muito baixo"
            if value >= 32.9 and value <= 38.9:
                valuesOn60[value] = "normal"
            if value >= 39 and value < 43.6:
                valuesOn60[value] = "alto"
            if value > 43.6:
                valuesOn60[value] = "muito alto"
        male[age] = valuesOn60

data = {}
data["male"] = male
data["female"] = female


with open("data/muscle.json", "w") as outfile:
    json.dump(data, outfile)