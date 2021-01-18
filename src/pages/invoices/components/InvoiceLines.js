import React from "react";
import { useTable } from "react-table";
import { Table, Button } from "react-bootstrap";
import { debounce } from "lodash";

import EditableCell from "./EditableCell";
import ProductSelect from "./ProductSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const InvoiceLines = ({
  data,
  onAdd,
  onUpdate,
  disable,
  unitOptions,
  vatRateOptions,
}) => {
  const updateMyData = (updatedIndex, id, value, product) => {
    const finalData = data.map((line, index) => {
      if (index === updatedIndex) {
        if (product) {
          return {
            ...line,
            product_id: product.id,
            price: product.unit_price,
            label: product.label,
          };
        }
        return { ...line, [id]: value };
      }
      return line;
    });

    onUpdate(finalData);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "id",
        accessor: "id",
      },
      {
        Header: "Product",
        accessor: "product_id",
        Cell: ({
          value: initialValue,
          row: { index },
          column: { id },
          updateMyData,
        }) => {
          // We need to keep and update the state of the cell normally
          const [value, setValue] = React.useState(initialValue);

          const onChange = debounce((value, product) => {
            setValue(value);
            updateMyData(index, id, value, product);
          }, 300);

          // If the initialValue is changed external, sync it up with our state
          React.useEffect(() => {
            setValue(initialValue);
          }, [initialValue]);

          return (
            <ProductSelect
              disabled={disable}
              value={value}
              onChange={onChange}
            />
          );
        },
      },

      {
        Header: "Quantity",
        accessor: "quantity",
        Cell: EditableCell,
      },
      {
        Header: "Unit",
        accessor: "unit",
        options: unitOptions,
        Cell: EditableCell,
      },
      {
        Header: "Label",
        accessor: "label",
        Cell: EditableCell,
      },
      {
        Header: "VAT rate",
        accessor: "vat_rate",
        options: vatRateOptions,
        Cell: EditableCell,
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: EditableCell,
      },
      {
        Header: "Delete",
        accessor: "_destroy",
        Cell: ({
          value: initialValue,
          row: { index, original },
          column: { id },
          updateMyData,
        }) => {
          // We need to keep and update the state of the cell normally
          const [value, setValue] = React.useState(false);

          const onChange = (value) => {
            setValue(value);
            updateMyData(index, id, value);
          };

          // If the initialValue is changed external, sync it up with our state
          React.useEffect(() => {
            setValue(initialValue);
          }, [initialValue]);

          return (
            <Button
              disabled={value}
              onClick={() => {
                if (original.id) {
                  onChange(!value);
                } else {
                  onUpdate(
                    data.filter((_, currentIndex) => index === currentIndex)
                  );
                }
              }}
            >
              Supprimer
            </Button>
          );
        },
      },
    ],

    [data, onUpdate, disable, unitOptions, vatRateOptions]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    updateMyData,
  });

  return (
    <div>
      <Button
        disabled={disable}
        size="sm"
        style={{ marginTop: 10, marginRight: 20 }}
        onClick={onAdd}
      >
        <FontAwesomeIcon
          style={{ marginRight: 10 }}
          icon={faPlus}
          size={10}
          color="white"
        />
        Buy new product
      </Button>

      <Table style={{ marginTop: 20 }} {...getTableProps()} size="sm">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default InvoiceLines;
