import { Button, Container, Row } from "react-bootstrap";
import "./landingPage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-txt">
            <div>
              <h1 className="title">Well Come to note zipper</h1>
              <p className="subtitle">on safe place for your note!</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button className="LandingButton" size="lg">
                  Login
                </Button>
              </a>
              <a href="/Register">
                <Button
                  className="LandingButton"
                  size="lg"
                  variant="outline-primary"
                >
                  Sign Up
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
