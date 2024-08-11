import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const StyledError = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    text-align: center;

    h1 {
        font-size: 3.6rem;
    }

    .smile {
        font-size: 15rem;
    }
;`

function Error() {

    const error = useRouteError();

    console.log("LOG ERROR ---> ", error);

    return (
        <StyledError>
            <p className="smile">🤕</p>
            <h1>This service is surrently unavailable. <br /> Please, try again later!</h1>
            <p>If the problem persists, please get in touch with the administrators!</p>
        </StyledError>
    )
}

export default Error;