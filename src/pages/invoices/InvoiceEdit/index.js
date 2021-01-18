import InvoiceForm from "../InvoiceForm";
import { withRouter } from "react-router-dom";

import { updateInvoice } from "../../../services/api";

const InvoiceEdit = ({ history, location }) => {
  //

  const { customer, ...invoiceValues } =
    location.state && location.state.invoice;

  return (
    <InvoiceForm
      title="Edit an invoice"
      onSubmit={(values) => {
        const finalValues =
          invoiceValues && invoiceValues.finalized
            ? { paid: values.paid }
            : values;

        updateInvoice(invoiceValues && invoiceValues.id, finalValues)
          .then(() => {
            history.push("/invoices");
          })
          .catch((err) => {
            console.log("Erreur", err);
          });
      }}
      initialValues={invoiceValues}
    />
  );
};

export default withRouter(InvoiceEdit);
