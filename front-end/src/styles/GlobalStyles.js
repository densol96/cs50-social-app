import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    :root {
        --border-radius--small: 3px;

        --color-black: black;
        --color-white: white;

        --transition-duration--default: 400ms;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-family: "Poppins", sans-serif;
        line-height: 1.5;
        font-size: 1.6rem;
    }

    .heading-primary {
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 10.5px;
        font-size: 8.2rem;
        margin-bottom: 4rem;
    }
`;

export default GlobalStyles;
