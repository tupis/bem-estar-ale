import styled from "styled-components";
import FormControl from "@mui/material/FormControl";

// FormControl

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  max-width: 400px;
  > div {
    margin: 5px 0;
    width: 100%;
  }
`;
export const FormControlStyled = styled(FormControl)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
