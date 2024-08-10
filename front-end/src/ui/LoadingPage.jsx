import styled from "styled-components";

const StyledLoadingPage = styled.div`
    width: 100vw;
    height: 100vh;
    /* background-color: var(--color-black); */
    background-color: var(--color-black--medium);
    color: white;
    /* color: var(--color-white); */
    display: flex;
    justify-content: center;
    align-items: center;

    .loader {
        width: 20rem;
        height: 22px;
        border-radius: 20px;
        /* color: #514b82; */
        /* color: white; */
        color: var(--color-white);
        border: 2px solid;
        position: relative;
    }

    .loader::before {
        content: "";
        position: absolute;
        margin: 2px;
        inset: 0 100% 0 0;
        border-radius: inherit;
        background: currentColor;
        animation: l6 2s infinite;

    }

    @keyframes l6 {
        100% {inset:0}
    }

    header {
        display: flex;
        flex-direction: column;
        align-items: center;
        
    }

    .heading {
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 10.5px;
        font-size: 6.2rem;
        margin-bottom: 4rem;
    }

    .sub-heading {
        margin-top: 1.5rem;
    }
`
function LoadingPage() {
    return (
        <StyledLoadingPage>
            <header>
                <h1 className="heading">💻 </h1>
                <div className="loader"></div>
                <h2 className="sub-heading">Loading..</h2>
            </header>
        </StyledLoadingPage>
    )
}

export default LoadingPage