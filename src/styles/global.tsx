import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  :root{
    --background: #f0f2f5;
    --red:  #E62E4D;
    --blue:  #5429CC;

    --blue-light:  #6933ff;

    --text-title: #363f5f;
    --text-body: #969cb3;

    --background: #f0f2f5;
    --shape: #fff
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* font-size: 16px (DESKTOP) */
  html{
    @media (max-width: 1080px){
      font-size: 93.75%; //15PX
    }

   
    @media (max-width: 720px){
      font-size: 87.5%; //14PX
    }
  }

  body{
    background: var(--background);
    -webkit-font-smoothing: initialiased
  }

  body, input, textarea, button{
    font-family: "Poppins", sans-serif;
    font-weight: 400
  }

  h1, h2, h3, h4, h5, h6, strong{
    font-weight: 600
  }

  button{
    cursor: pointer;
  }

  [disabled]{
    opacity: 0.6;
    cursor: not-allowed
  }
  
`