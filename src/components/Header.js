import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  faFileInvoiceDollar,
  faUserCircle,
  faCocktail,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => (
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Invoicy</Navbar.Brand>
    <Nav className="mr-auto">
      <NavLink
        to="/customers"
        activeClassName="active"
        component={(props, ref) => (
          <Nav.Link {...props}>
            <FontAwesomeIcon style={{ marginRight: 8 }} icon={faUserCircle} />
            Customers
          </Nav.Link>
        )}
      ></NavLink>

      <NavLink
        to="/products"
        activeClassName="active"
        component={(props, ref) => (
          <Nav.Link {...props}>
            <FontAwesomeIcon style={{ marginRight: 8 }} icon={faCocktail} />
            Products
          </Nav.Link>
        )}
      ></NavLink>
      <NavLink
        to="/invoices"
        activeClassName="active"
        component={(props, ref) => (
          <Nav.Link {...props}>
            <FontAwesomeIcon
              style={{ marginRight: 8 }}
              icon={faFileInvoiceDollar}
            />
            Invoices
          </Nav.Link>
        )}
      ></NavLink>
    </Nav>
  </Navbar>
);

export default Header;
