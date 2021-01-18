import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useTable } from "react-table";
import { Table, Pagination, Form } from "react-bootstrap";

import { products as getProducts } from "../../../services/api";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 0,
    total_entries: 0,
    total_pages: 0,
  });

  const getProductsQuery = (query, page = 1) =>
    getProducts({ query, page }).then((response) => {
      if (response && response.products) {
        setProducts(response.products);
        setPagination(response.pagination);
      }
    });

  useEffect(() => {
    getProductsQuery("");
  }, []);

  let items = [];
  for (let number = 1; number <= pagination.total_pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === pagination.page}
        onClick={() => getProductsQuery(query, number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Label",
        accessor: "label",
      },

      {
        Header: "Price",
        accessor: "unit_price",
      },
      {
        Header: "Price without tax",
        accessor: "unit_price_without_tax",
      },
      {
        Header: "Tax",
        accessor: "unit_tax",
      },
      {
        Header: "",
        accessor: "actions",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: products });

  const renderTable = () => (
    <Table {...getTableProps()} size="sm">
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
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  return (
    <div style={{ padding: 20 }}>
      <h3 style={{ marginBottom: 20 }}>List of products</h3>
      <Form>
        <Form.Group>
          <Form.Label>Search a product</Form.Label>
          <Form.Control
            type="text"
            placeholder="Label"
            onChange={debounce((e) => {
              setQuery(e.target.value);
              getProductsQuery(e.target.value);
            }, 200)}
          />
        </Form.Group>
      </Form>
      {renderTable()}
      <Pagination style={{ marginTop: 20 }}>{items}</Pagination>
    </div>
  );
};

export default ProductsList;
