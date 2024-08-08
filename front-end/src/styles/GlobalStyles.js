import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    :root {
        --border-radius--small: 3px;
        --border-radius--medium: 7px;

        --color-black: black;
        --color-white: white;
        --color-green: #22c55e;
        --color-red: #ef4444;
        --color-grey: #444;

        --transition-duration--default: 400ms;

        --shadow-light--default: 0 0rem 4rem 3px rgba(255, 255, 255, 0.5);
        --shadow-dark--default: 0 0rem 4rem 3px rgba(0, 0, 0, 0.5);
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
        overflow-x: hidden;
        color: #444;
    }

    .heading-primary {
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 10.5px;
        font-size: 8.2rem;
        margin-bottom: 4rem;
    }

    @keyframes moveInFromRight {
        0% {
            transform: translateX(20%);
            opacity: 0;
        }

        80% {
            transform: translateX(-3%);
        }

        100% {
            transform: translateX(0%);
            opacity: 1;
        }
    }

    @keyframes moveInFromLeft {
        0% {
            transform: translateX(-20%);
            opacity: 0;
        }

        80% {
            transform: translateX(3%);
        }

        100% {
            transform: translateX(0%);
            opacity: 1;
        }
    }
`;

export default GlobalStyles;
