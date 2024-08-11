import styled from "styled-components"


const Spinner = styled.span`
    height: ${props => props.size}px;
    width:  ${props => props.size}px;
    border: ${props => props.border}px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

Spinner.defaultProps = {
    size: 48,
    border: 5,
  };

export default Spinner
