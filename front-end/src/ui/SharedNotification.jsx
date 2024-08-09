import styled from "styled-components"
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";

const StyledNotification = styled.div`
    max-width: 50rem;
    width: 100%;
    min-height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 50%;
    top: 3rem;
    transform: translateX(-50%);
    z-index: 99999;
    border-radius: var(--border-radius--medium);
    color: white;
    box-shadow: var(--shadow-dark--default);
    font-size: 1.7rem;
    animation-name: moveInFromUp;
    animation-duration: 500ms;
    animation-fill-mode: both;
    animation-timing-function: ease-in;

    &.success-notification {
        background-color: var(--color-success-transparent);
    }

    &.error-notification {
        background-color: var(--color-error-transparent);
    }

    button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: white;
        font-size: 3rem;
        transition: transform 200ms;

        &:hover {
            cursor: pointer;
            transform: scale(1.1);
        }
    }
`
const CLOSE_ITSELF_AFTER = 5000;

function SharedNotification({children, status = "success", hideNotification}) {
    useEffect(() => {
        const timerId = setTimeout(() => {
            hideNotification();
        }, CLOSE_ITSELF_AFTER);

        return () => clearTimeout(timerId);
    }, []);
    
    return (
        <StyledNotification className={`${status}-notification`}>
            {children}
            <button onClick={hideNotification}>
                <IoMdClose />
            </button>
        </StyledNotification>
    )
}

export default SharedNotification
