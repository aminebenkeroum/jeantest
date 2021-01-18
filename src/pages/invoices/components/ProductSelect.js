import React, { useEffect, useState } from "react";
import CustomSelect from "../../../components/CustomSelect";
import { products as getProducts } from "../../../services/api";

const ProductSelect = (props) => {
  const { value, onChange } = props;
  const [options, setOptions] = useState([]);
  useEffect(() => {
    // get products list
    getProducts({ query: "", per_page: 200 }).then((response) => {
      if (response && response.products) {
        const finalOptions = response.products.map((product) => ({
          label: product.label,
          value: product.id,
          product,
        }));
        setOptions(finalOptions);
      }
    });
  }, []);

  return (
    <CustomSelect
      as="select"
      value={value}
      options={options}
      onChange={(e) => {
        const option = options.find((option) => option.value == e.target.value);
        onChange(e.target.value, option && option.product);
      }}
    />
  );
};

export default ProductSelect;
