import styled from "styled-components";
import Button from "./Button";

const HomepageStyled = styled.div`
  height: 100vh;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.5) 20%,
      rgba(0, 0, 0, 0.9) 35%,
      black 85%
    ),
    url("/home-bg.jpg");
  background-position: 30% 50%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: white;
    background-color: rgba(0, 0, 0, 0.078);
    backdrop-filter: blur(8px);
    z-index: 1;
  }
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100000;
  color: white;
`;
Button;
const P = styled.p`
  text-transform: uppercase;
  font-size: 2.8rem;
`;

const Text = styled.div`
  width: 45%;
  text-align: center;
  position: absolute;
  right: 7%;
  top: 20%;
`;

const Form = styled.form`
  max-width: 55rem;
  width: 100%;
  padding: 5rem 6rem;
  position: absolute;
  left: 10%;
  top: 20%;
  background-color: #00000063;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 3rem;
  border-radius: 12px;
  box-shadow: 0 0rem 4rem 3px rgba(255, 255, 255, 0.5);

  .terms {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    input {
      height: 2rem;
      width: 2rem;
      accent-color: black;
    }

    label {
      font-size: 1.6rem;
    }
  }
  div.btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      text-transform: uppercase;
      font-weight: 700;
      font-size: 2rem;
    }

    input {
      padding: 0.5rem 2rem;
      font-family: inherit;
      font-size: 1.8rem;
      border-radius: 3px;
      border: none;
    }
  }
`;

function Homepage() {
  return (
    <HomepageStyled>
      <Content>
        <Form>
          <div>
            <label htmlFor="name">Full Name:</label>
            <input autoFocus id="name" type="text" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" />
          </div>
          <div>
            <labeldefault htmlFor="password">Password:</labeldefault>
            <input type="text" id="password" />
          </div>
          <div>
            <label htmlFor="">Confirm password:</label>
            <input type="text" />
          </div>
          <div className="terms">
            <input id="checkbox" type="checkbox" />
            <label htmlFor="checkbox">I agree to terms and conditions</label>
          </div>
          <div className="btns">
            <Button>Register</Button>
            {/* <Link size="small" variation="link">
              Already have an account
            </Link> */}
          </div>
        </Form>
        <Text>
          <h1 className="heading-primary">
            Welcome to
            <br /> CS50 Social App
          </h1>
          <P>Please, create an account to connect to our community!</P>
        </Text>
      </Content>
    </HomepageStyled>
  );
}

export default Homepage;
