import React from "react";
import { Form } from "react-bootstrap";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id, options },
  updateMyData,
}) => {
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
    updateMyData(index, id, e.target.value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (options) {
    return (
      <Form.Control as="select" onChange={onChange}>
        {options.map((option) => (
          <option value={option.value} selected={value === option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
    );
  }

  return <Form.Control value={value} onChange={onChange} />;
};

export default EditableCell;
