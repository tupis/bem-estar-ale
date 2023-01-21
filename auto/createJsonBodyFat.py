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
            if value < 21:
                valuesUnder40[value] = "muito baixo"
            if value >= 21 and value <= 32.9:
                valuesUnder40[value] = "normal"
            if value >= 33 and value < 38.9:
                valuesUnder40[value] = "alto"
            if value > 38.9:
                valuesUnder40[value] = "muito alto"
        female[age] = valuesUnder40

    if age >= 40 and age <= 59:
        valuesOn40 = {}
        for value in values: 
            if value < 23:
                valuesOn40[value] = "muito baixo"
            if value >= 23 and value <= 33.9:
                valuesOn40[value] = "normal"
            if value >= 34 and value < 39.9:
                valuesOn40[value] = "alto"
            if value > 39.9:
                valuesOn40[value] = "muito alto"
        female[age] = valuesOn40

    if age >= 60 and age < 81 :
        valuesOn60 = {}
        for value in values: 
            if value < 24:
                valuesOn60[value] = "muito baixo"
            if value >= 24 and value <= 35.9:
                valuesOn60[value] = "normal"
            if value >= 36 and value < 41.9:
                valuesOn60[value] = "alto"
            if value > 41.9:
                valuesOn60[value] = "muito alto"
        female[age] = valuesOn60

# Male
for age in ages:
    if age < 40:
        valuesUnder40 = {}
        for value in values:
            if value < 8:
                valuesUnder40[value] = "muito baixo"
            if value >= 8 and value <= 19.9:
                valuesUnder40[value] = "normal"
            if value >= 20 and value < 24.9:
                valuesUnder40[value] = "alto"
            if value > 24.9:
                valuesUnder40[value] = "muito alto"
        male[age] = valuesUnder40

    if age >= 40 and age <= 59:
        valuesOn40 = {}
        for value in values: 
            if value < 11:
                valuesOn40[value] = "muito baixo"
            if value >= 11 and value <= 21.9:
                valuesOn40[value] = "normal"
            if value >= 22 and value < 27.9:
                valuesOn40[value] = "alto"
            if value > 27.9:
                valuesOn40[value] = "muito alto"
        male[age] = valuesOn40

    if age >= 60 and age < 81 :
        valuesOn60 = {}
        for value in values: 
            if value < 13:
                valuesOn60[value] = "muito baixo"
            if value >= 13 and value <= 24.9:
                valuesOn60[value] = "normal"
            if value >= 25 and value < 29.9:
                valuesOn60[value] = "alto"
            if value > 29.9:
                valuesOn60[value] = "muito alto"
        male[age] = valuesOn60

data = {}
data["male"] = male
data["female"] = female


with open("data/body-fat.json", "w") as outfile:
    json.dump(data, outfile)