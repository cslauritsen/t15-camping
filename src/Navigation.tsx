import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useCookies} from "react-cookie";
import {ttTok} from "./cookies";
import {useState} from "react";
import {SyncStatusModal} from "./SyncStatusModal";
import {SyncMenuItem} from "./SyncMenuItem";


export function Navigation(props: any) {
    const [cookies, setCookie, removeCookie] = useCookies([ttTok]);
    const [expanded, setExpanded] = useState(false);
    const [ syncStatus, setSyncStatus ] = useState('');
    const logout = () => {
        removeCookie(ttTok);
        setExpanded(false);
    }


    return (
        <>
            <SyncStatusModal message={syncStatus} />
        <Navbar bg="light" expand="lg" fixed={'top'} expanded={expanded}>
            <Container>
                <Navbar.Brand href="#home">T15 Campers</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={e => setExpanded(true)}/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/*<Nav.Link href="#home">Home</Nav.Link>*/}
                        <Nav.Link onClick={e => setExpanded(false)}><SyncMenuItem /></Nav.Link>
                        <Nav.Link onClick={logout} disabled={!(cookies?.ttTok)}>Logout</Nav.Link>
                        {/*{*/}
                        {/*    cookies.ttTok2*/}
                        {/*        ? <Nav.Link onClick={() => { console.debug('logout!'); removeCookie(ttTok);}}>Logout</Nav.Link>*/}
                        {/*        : null*/}
                        {/*}*/}
                        {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
                        {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#action/3.2">*/}
                        {/*        Another action*/}
                        {/*    </NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Divider/>*/}
                        {/*    <NavDropdown.Item onClick={logout} disabled={!(cookies?.ttTok2)}>*/}
                        {/*        Logout*/}
                        {/*    </NavDropdown.Item>*/}
                        {/*</NavDropdown>*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}