import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    background-color: ${({ theme }) => theme.colors.mauve1};
    color: ${({ theme }) => theme.colors.mauve12};
    position: absolute;
    inset: 0;

    transition: background-color 0.3s ease, color 0.3s ease;
  }

  
  ::-webkit-scrollbar {
    width: 0.6rem;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: rgba(235, 235, 235, 0.7);
    border-radius: 1.6rem;
  }

  button {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;
