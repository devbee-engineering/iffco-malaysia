import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import logo from "../../public/logo.png"; 
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RouterName } from "../constants/Constants";



const Sidebar = () => {
  const navigate = useNavigate();
    const userName = localStorage.getItem("userName") ?? "User";

    const handleNavigate = () => {
        navigate('/mfa-setup');
    };
    const mfaStatus = localStorage.getItem("mfaStatus") ?? "false";
    return (
      <>
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="Logo" style={{ width: "40px" }} />{" "}
        </Navbar.Brand>
        <Nav activeKey={location.pathname} className="mr-auto">
          <Nav.Link href="/invoices">Invoices</Nav.Link>
          <Nav.Link href="#" onClick={() => alert("Coming Soon")}>
            Reports
          </Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <div style={{ cursor: "pointer" }}>
            <Dropdown>
              <Dropdown.Toggle>
                <Navbar.Text className="mx-2">{userName} </Navbar.Text>
                <FaUserCircle />
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ minWidth: "250px" }}>
                                    {mfaStatus === "false" &&
                                        <Dropdown.Item href={RouterName.MFA_SETUP}>
                                            Enable MFA
                                        </Dropdown.Item>
                                    }
                
                <Dropdown.Item
                  href="#"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  Logout
                </Dropdown.Item>
                <Dropdown.Item href={RouterName.CHANGE_PASSWORD}>
                  Change Password
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
            </Navbar>
            
            {mfaStatus === "false" &&
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "10px",

                    }}
                >
                    <div
                        style={{
                            backgroundColor: "red",
                            padding: "15px",
                            textAlign: "center",
                            color: "white",
                            maxWidth: "15000px",
                            width: "250%",
                        }}
                    >
                        <p style={{ margin: 0, fontWeight: "bold" }}>
                            Improve the security of your account by registering multi-factor authentication (MFA) using below link.<br /> This provides a second means of verifying your identity in addition to a password.{" "}
                            <span
                                onClick={handleNavigate}
                                style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                            >
                                Enable MFA
                            </span>
                        </p>
                    </div>
                </div>
            }
    </>
  );
};

export default Sidebar;
