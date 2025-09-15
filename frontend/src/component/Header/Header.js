import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../action/userAction";

function Header({ setSearch }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <Navbar expand="lg" variant="dark" bg="primary">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">Note zipper</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Form className="d-flex">
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            </Nav>
            {userInfo ? (
              <Nav>
                <Nav.Link as={Link} to="/mynotes">
                  My Notes
                </Nav.Link>
                <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">
                    My profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      logoutHandler();
                    }}
                  >
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
