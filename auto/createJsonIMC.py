import json

imcsranged = [x / 10 for x in range(10, 601)]

imcs = {}

for imc in imcsranged: 
    if imc < 18.5:
        imcs[imc] = "abaixo do peso"
    if imc >= 18.5 and imc <= 24.9:
        imcs[imc] = "peso ideal"
    if imc >= 25 and imc < 29.9:
        imcs[imc] = "levemente acima do peso"
    if imc > 30 and imc < 34.9:
        imcs[imc] = "obesidade grau I"
    if imc > 35 and imc < 39.9:
        imcs[imc] = "obesidade grau II (severa)"
    if imc > 40:
        imcs[imc] = "obesidade severa grau III (mórbida)"

with open("data/imc.json", "w") as outfile:
    json.dump(imcs, outfile)