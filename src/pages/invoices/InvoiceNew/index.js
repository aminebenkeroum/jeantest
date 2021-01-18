import InvoiceForm from "../InvoiceForm";
import { withRouter } from "react-router-dom";

import { createInvoice } from "../../../services/api";

const InvoiceNew = ({ history }) => {
  return (
    <InvoiceForm
      title="Create a new invoice"
      onSubmit={(values) => {
        createInvoice(values)
          .then(() => {
            history.push("/invoices");
          })
          .catch((err) => {
            console.log("Erreur", err);
          });
      }}
      initialValues={{
        customer_id: null,
        date: null,
        deadline: null,
        tax: 0,
        total: 0,
      }}
      isNew
    />
  );
};

export default withRouter(InvoiceNew);
