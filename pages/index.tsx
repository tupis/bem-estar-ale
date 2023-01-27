import Head from "next/head";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import type { TDocumentDefinitions, Content } from "pdfmake/interfaces";
import { Main, FormControlStyled } from "../styles/";
import { useEffect, useState } from "react";
import * as bodyFatImport from "../data/body-fat.json";
import * as muscleImport from "../data/muscle.json";
import * as imcImport from "../data/imc.json";
import * as visceralImport from "../data/visceral.json";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ImagesBase64 from "../public/images/images-base64.json";

const bodyFatJson = bodyFatImport as { [key: string]: any };

const muscleJson = muscleImport as { [key: string]: any };

const imcJson = imcImport as { [key: string]: any };

const visceralJson = visceralImport as { [key: string]: any };

export default function Home() {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [date, setDate] = useState<Date>(new Date());
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [waist, setWaist] = useState<string>("");

  const [imc, setImc] = useState<number | "">("");
  const [imcClass, setImcClass] = useState<string>("");
  const [filterNormalImc, setFilterNormalImc] = useState<any[]>([]);

  const [bodyFat, setBodyFat] = useState<number | "">("");
  const [bodyFatClass, setBodyFatClass] = useState<string>("");
  const [filterNormalBodyFat, setFilterNormalBodyFat] = useState<any[]>([]);

  const [muscle, setMuscle] = useState<number | "">("");
  const [muscleClass, setMuscleClass] = useState<string>("");
  const [filterNormalMuscle, setFilterNormalMuscle] = useState<any[]>([]);

  const [visceral, setVisceral] = useState<number | "">("");
  const [visceralClass, setVisceralClass] = useState<string>("");
  const [filterNormalVisceral, setFilterNormalVisceral] = useState<any[]>([]);

  const [toggleButton, setToggleButton] = useState<boolean>(true);

  const createPdf = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // const footer = [{ text: "Footer" }];

    const header = [{ text: "AVALIÇÃO ELETRÔNICA DE BEM ESTAR" }];
    let content: Content = [
      {
        table: {
          widths: ["*", 100],
          body: [
            [`Nome: ${name}`, `Data: ${dayjs(date).format("DD/MM/YYYY")}`],
          ],
        },
      },
      {
        table: {
          widths: ["*", "*", "*", "*", "*"],
          body: [
            [
              `Idade: ${age} anos`,
              `Peso: ${weight} kg`,
              `Altura: ${height} cm`,
              `Gênero: ${gender === "male" ? "Homem" : "Mulher"}`,
              `Cintura: ${waist} cm`,
            ],
          ],
        },
      },
      {
        table: {
          widths: ["*", "*"],
          body: [[`Whatsapp: ${whatsapp}`, `Email: ${email}`]],
        },
      },
      {
        text: `Seu IMC é ${imc}, considerado ${imcClass}`,
        marginTop: 20,
        marginLeft: 130,
      },
      {
        text: `O normal para sua altura e peso é entre ${
          filterNormalImc[0][0]
        } e ${filterNormalImc[filterNormalImc.length - 1][0]}`,
        marginLeft: 130,
      },
      {
        image: ImagesBase64.tableIMC,
        fit: [350, 350],
        marginLeft: 130,
      },
      {
        text: `Seu percentual de gordura é ${bodyFat}, considerado ${bodyFatClass}`,
        marginTop: 10,
        marginLeft: 130,
      },
      {
        text: `O normal para seu sexo e idade é entre ${
          filterNormalBodyFat[0][0]
        } e ${filterNormalBodyFat[filterNormalBodyFat.length - 1][0]}`,
        marginLeft: 130,
      },
      {
        image:
          gender === "male"
            ? ImagesBase64.tableBodyFatMale
            : ImagesBase64.tableBodyFatFemale,
        fit: [350, 350],
        marginLeft: 130,
      },
      {
        text: `Seu percentual de massa magra é ${muscle}, considerado ${muscleClass}`,
        marginLeft: 130,
        marginTop: 10,
      },
      {
        text: `O normal para seu sexo e idade é entre ${
          filterNormalMuscle[0][0]
        } e ${filterNormalMuscle[filterNormalMuscle.length - 1][0]}`,
        marginLeft: 130,
      },
      {
        image: ImagesBase64.tableMuscle,
        fit: [350, 350],
        marginLeft: 130,
      },
      {
        text: `Seu percentual de gordural visceral é ${muscle}, considerado ${muscleClass}`,
        marginLeft: 130,
        marginTop: 10,
      },
      {
        text: `O normal é entre ${filterNormalVisceral[0][0]} e ${
          filterNormalVisceral[filterNormalVisceral.length - 1][0]
        }`,
        marginLeft: 130,
      },
      {
        image: ImagesBase64.visceral,
        fit: [350, 350],
        marginLeft: 130,
      },
    ];

    const docConfig: TDocumentDefinitions = {
      pageSize: "A4",
      pageOrientation: "portrait",
      //[left, top, right, bottom]
      pageMargins: [0, 15, 0, 0],
      header,
      content,
      // footer,
    };

    pdfMake.createPdf(docConfig).open();
  };

  useEffect(() => {
    if (gender && age && bodyFat) {
      console.log(typeof bodyFat);
      setBodyFatClass(bodyFatJson[gender][age][bodyFat.toFixed(1)]);
      const filterNormalBodyFat = Object.entries(
        bodyFatJson[gender][age]
      ).filter((item) => item[1] === "normal");
      setFilterNormalBodyFat(filterNormalBodyFat);
    }
  }, [bodyFat, gender, age]);

  useEffect(() => {
    if (gender && age && muscle) {
      setMuscleClass(muscleJson[gender][age][muscle.toFixed(1)]);
      const filterNormalMuscle = Object.entries(muscleJson[gender][age]).filter(
        (item) => item[1] === "normal"
      );
      setFilterNormalMuscle(filterNormalMuscle);
    }
  }, [muscle, gender, age]);

  useEffect(() => {
    setImcClass(imcJson[Number(imc).toFixed(1)]);
    const normalFilterImc = Object.entries(imcJson).filter(
      (item) => item[1] === "peso ideal"
    );
    setFilterNormalImc(normalFilterImc);
  }, [imc]);

  useEffect(() => {
    setImcClass(visceralJson[Number(visceral)]);
    const normalFilterVisceral = Object.entries(visceralJson).filter(
      (item) => item[1] === "nível normal"
    );
    setFilterNormalVisceral(normalFilterVisceral);
  }, [visceral]);

  useEffect(() => {
    const allFields = [
      name,
      age,
      weight,
      height,
      whatsapp,
      email,
      gender,
      waist,
      imc,
      muscle,
      visceral,
    ].some((field) => field === "");

    allFields ? setToggleButton(true) : setToggleButton(false);

    console.log(allFields);
  }, [
    name,
    age,
    weight,
    height,
    whatsapp,
    email,
    gender,
    waist,
    imc,
    muscle,
    visceral,
  ]);

  return (
    <>
      <Head>
        <title>Ale baldez estética</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <TextField
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Data"
            value={date}
            onChange={(newValue): any => {
              setDate(newValue!);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          id="outlined-basic"
          label="Whatsapp"
          variant="outlined"
          value={whatsapp}
          onChange={(e: any) => setWhatsapp(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="E-mail"
          variant="outlined"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Idade"
          variant="outlined"
          value={age}
          onChange={(e: any) => setAge(e.target.value)}
          type={"number"}
        />
        <TextField
          id="outlined-basic"
          label="Altura"
          variant="outlined"
          value={height}
          onChange={(e: any) => setHeight(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          type={"number"}
        />
        <TextField
          id="outlined-basic"
          label="Peso"
          variant="outlined"
          value={weight}
          onChange={(e: any) => setWeight(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
          type={"number"}
        />
        <TextField
          id="outlined-basic"
          label="Cintura"
          variant="outlined"
          value={waist}
          onChange={(e: any) => setWaist(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          type={"number"}
        />
        <TextField
          id="outlined-basic"
          label="IMC"
          variant="outlined"
          value={imc}
          onChange={(e: any) => setImc(Number(e.target.value))}
          type={"number"}
        />
        <TextField
          id="outlined-basic"
          label="Percentual Gordura"
          variant="outlined"
          value={bodyFat}
          onChange={(e: any) => setBodyFat(Number(e.target.value))}
          type={"number"}
        />
        <TextField
          id="outlined-basic"
          label="Percentual Musculo Esquelético"
          variant="outlined"
          value={muscle}
          onChange={(e: any) => setMuscle(Number(e.target.value))}
          type={"number"}
        />
        <TextField
          id="outlined-basic"
          label="Gordura Visceral"
          variant="outlined"
          value={visceral}
          onChange={(e: any) => setVisceral(Number(e.target.value))}
          type={"number"}
        />
        <FormControlStyled>
          <FormLabel id="demo-row-radio-buttons-group-label">Sexo</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Mulher"
              onChange={(e: any) => setGender(e.target.value)}
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Homem"
              onChange={(e: any) => setGender(e.target.value)}
            />
          </RadioGroup>
        </FormControlStyled>
        <Button
          variant="contained"
          endIcon={<PictureAsPdfIcon />}
          onClick={createPdf}
          disabled={toggleButton}
        >
          Gerar pdf
        </Button>
      </Main>
    </>
  );
}
