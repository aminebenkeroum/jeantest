import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import CustomSelect from "../../../components/CustomSelect";
import { customers as getCustomers } from "../../../services/api";

const CustomerSelect = (props) => {
  const { value, onChange, readOnly, disabled, size } = props;
  const [options, setOptions] = useState([]);
  useEffect(() => {
    // get products list
    getCustomers({ query: "", per_page: 300 }).then((response) => {
      if (response && response.customers) {
        const finalOptions = response.customers.map((customer) => ({
          label: `${customer.first_name} ${customer.last_name} `,
          value: customer.id,
        }));
        setOptions(finalOptions);
      }
    });
  }, []);

  return (
    <CustomSelect
      as="select"
      name="customer_id"
      size={size}
      value={value}
      custom
      options={options}
      id="customer_id"
      onChange={onChange}
      disabled={readOnly || disabled}
    />
  );
};

export default CustomerSelect;
