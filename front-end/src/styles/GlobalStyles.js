import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    :root {
        --border-radius--small: 3px;
        --border-radius--medium: 7px;

        --color-black: black;
        --color-black--medium: rgb(22, 24, 29);
        --color-black--light: rgb(43, 48, 59);

        /* --color-white: white; */
        --color-white: rgb(246, 247, 249);
        --color-green: #22c55e;
        --color-red: #ef4444;
        --color-red--light: #fca5a5;
        --color-grey: #444;
        --color-grey--light: #555;

        --color-error-transparent: rgba(109, 49, 49, 0.65);
        --color-success-transparent: rgba(53, 95, 53, 0.65);

        --transition-duration--default: 400ms;

        --shadow-light--default: 0 0rem 4rem 3px rgba(255, 255, 255, 0.5);
        --shadow-dark--default: 0 0rem 4rem 3px rgba(0, 0, 0, 0.5);
        --shadow-dark--light: 0 0rem 4rem 3px rgba(0, 0, 0, 0.15);

        /* FONTS */

        --font-size--xxl: 7.2rem;
        --font-size--xl: 4.8rem;
        --font-size--l: 3.6rem;
        --font-size--m: 2.4rem;
        --font-size--default: 1.6rem;
        --font-size--s: 1.4rem;
        --font-size--xs: 1.2rem;

        /* GAPS */
        --gap--xxl: 6rem;
        --gap--xl: 4rem;
        --gap--l: 3rem;
        --gap--m: 2rem;
        --gap--s: 1rem;
        --gap--xs: 0.5rem;

        /* OTHERS */
        --logo-height: 4rem;
        --logo-width: 4rem;

        /* LINE_HEIGHTS */
        --lh-med: 1.4;


        /* SPACINGS */
        --spacing-s: 2rem;
        --spacing--m: 7.2rem;
        --spacing--l: 9.2rem;
        --spacing--largest: 15rem; 
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
        color: var(--color-grey);
    }

    .heading-primary {
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 10.5px;
        font-size: 8.2rem;
        margin-bottom: 4rem;
    }

    ul {
            list-style: none;
    }

    .blurred-bg {
        background-color: #00000063;
        backdrop-filter: blur(10px);
    }

    .hidden {
        display: none;
    }

    .text-center {
        text-align: center;
    }

    .search-input {
        border-radius: var(--border-radius--medium);
        font-family: inherit;
        color: inherit;
        padding:  0.5rem 1.5rem;
        outline: none;
        border: none;
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

    @keyframes moveInFromTop {
        0% {
            opacity: 0;
            top: -1rem;
        }

        50% {
            opacity: 1;
        }

        100% {
            top: 3rem;
        }
    }

    @keyframes shakeUpAndDown {
        0% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(-5%);
        }

        100% {
            transform: translateY(0);
        }
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
`;

export default GlobalStyles;
