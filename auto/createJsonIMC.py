import json

imcsranged = [x / 10 for x in range(10, 601)]

imcs = {}

for imc in imcsranged: 
    if imc < 18:
        imcs[imc] = "abaixo do peso"
    if imc >= 18 and imc <= 24.9:
        imcs[imc] = "peso normal"
    if imc >= 25 and imc < 29.9:
        imcs[imc] = "acima do peso"
    if imc > 30 and imc < 39.9:
        imcs[imc] = "obesidade"
    if imc > 40:
        imcs[imc] = "obesidade severa"

with open("data/imc.json", "w") as outfile:
    json.dump(imcs, outfile)