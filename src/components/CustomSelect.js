import { Form } from "react-bootstrap";

const CustomSelect = ({ options, value, onChange, ...rest }) => {
  return (
    <Form.Control custom onChange={onChange} {...rest}>
      {options.map((option) => (
        <option value={option.value} selected={value === option.value}>
          {option.label}
        </option>
      ))}
    </Form.Control>
  );
};

export default CustomSelect;
