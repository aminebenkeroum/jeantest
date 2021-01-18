import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import CustomersList from "./pages/customers/customersList";
import ProductsList from "./pages/products/productsList";
import { InvoiceEdit, InvoiceNew, InvoicesList } from "./pages/invoices";

function App() {
  return (
    <Router>
      <Header />
      <Container fluid>
        <Switch>
          <Route path="/customers">
            <CustomersList />
          </Route>
          <Route path="/products">
            <ProductsList />
          </Route>
          <Route exact path="/invoices">
            <InvoicesList />
          </Route>
          <Route exact path="/invoices/create">
            <InvoiceNew />
          </Route>
          <Route exact path="/invoices/:id">
            <InvoiceEdit />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
