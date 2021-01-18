import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { Form, Col, Button, FormControl } from "react-bootstrap";
import InvoiceLines from "../components/InvoiceLines";
import CustomerSelect from "../components/CustomerSelect";

const validationSchema = yup.object({
  customer_id: yup.string().required("Customer is required"),
  date: yup.date().required("Invoicing date is required"),
  deadline: yup.date().required("Deadline date is required"),
  paid: yup.boolean().default(false),
  finalized: yup.boolean().default(false),
});

const unitOptions = [
  { label: "Hour", value: "hour" },
  { label: "Piece", value: "piece" },
  { value: "day", label: "Day" },
];

const vatRateOptions = [
  { value: "0", label: "0" },
  { value: "5.5", label: "5.5" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
];

const InvoiceForm = (props) => {
  const { isNew, title, onSubmit, initialValues } = props;

  const [invoiceLines, setInvoiceLines] = useState(
    initialValues && initialValues.invoice_lines
  );

  const finalizedInvoice = initialValues && initialValues.finalized;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        if (isNew) {
          onSubmit(values);
        } else {
          onSubmit({ ...values, invoice_lines_attributes: invoiceLines });
        }
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => {
        return (
          <Form style={{ padding: 20 }} onSubmit={handleSubmit}>
            <h2>{title}</h2>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Select a customer :</Form.Label>
                <CustomerSelect
                  onChange={handleChange}
                  value={values.customer_id}
                  disabled={finalizedInvoice}
                />
                {touched.customer_id && errors.customer_id && (
                  <span className="error-message" id="customer_id">
                    {errors.customer_id}
                  </span>
                )}
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Invoicing Date :</Form.Label>
                <Form.Control
                  id="date"
                  name="date"
                  label="Invoicing Date"
                  type="date"
                  value={values.date}
                  disabled={finalizedInvoice}
                  onChange={handleChange}
                />
                {touched.date && errors.date && (
                  <span className="error-message" id="date">
                    {errors.date}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Deadline Date :</Form.Label>
                <Form.Control
                  id="deadline"
                  name="deadline"
                  label="Deadline Date"
                  type="date"
                  value={values.deadline}
                  disabled={finalizedInvoice}
                  onChange={handleChange}
                />
                {touched.deadline && errors.deadline && (
                  <span className="error-message" id="deadline">
                    {errors.deadline}
                  </span>
                )}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Paid :</Form.Label>
                <Form.Check
                  id="paid"
                  name="paid"
                  label="Paid invoice"
                  type="checkbox"
                  checked={values.paid}
                  value={values.paid}
                  onChange={handleChange}
                />
                {touched.paid && errors.paid && (
                  <span className="error-message" id="paid">
                    {errors.paid}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Finalize the invoice :</Form.Label>
                <Form.Check
                  id="finalized"
                  name="finalized"
                  label="Finalized invoice"
                  type="checkbox"
                  checked={values.finalized}
                  value={values.finalized}
                  onChange={handleChange}
                  disabled={finalizedInvoice}
                />
                {touched.finalized && errors.finalized && (
                  <span className="error-message" id="finalized">
                    {errors.finalized}
                  </span>
                )}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Tax :</Form.Label>
                <Form.Control
                  id="tax"
                  name="tax"
                  type="text"
                  value={values.tax}
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Total :</Form.Label>
                <Form.Control
                  id="total"
                  name="total"
                  type="text"
                  value={values.total}
                  readOnly
                />
              </Form.Group>
            </Form.Row>
            {!isNew && (
              <InvoiceLines
                vatRateOptions={vatRateOptions}
                unitOptions={unitOptions}
                onAdd={() =>
                  setInvoiceLines(
                    invoiceLines.concat({
                      product_id: null,
                      price: 0,
                      quantity: 0,
                      unit: unitOptions[0].value,
                      vat_rate: vatRateOptions[0].value,
                      _destroy: false,
                    })
                  )
                }
                disable={finalizedInvoice}
                onUpdate={(newLines) => setInvoiceLines(newLines)}
                data={invoiceLines}
                invoiceId={null}
              />
            )}
            <Button variant="primary" type="submit">
              {isNew ? "Create" : "Update"}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InvoiceForm;
