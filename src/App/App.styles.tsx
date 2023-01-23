import styled from "styled-components/macro";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
          box-sizing: border-box;
  }
`;

export const Container = styled.div`
  background: linear-gradient(
    45deg,
    #167be0 0,
    #73d4fa 25%,
    #bfdeff 50%,
    #73d4fa 75%,
    #167be0 100%
  );
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
