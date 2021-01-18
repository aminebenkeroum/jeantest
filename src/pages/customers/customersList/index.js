import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useTable } from "react-table";
import { Table, Pagination, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

import { customers as getCustomers } from "../../../services/api";

const CustomersList = ({ history }) => {
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 0,
    total_entries: 0,
    total_pages: 0,
  });

  const getCustomersQuery = (query, page = 1) =>
    getCustomers({ query, page }).then((response) => {
      if (response && response.customers) {
        setCustomers(response.customers);
        setPagination(response.pagination);
      }
    });

  useEffect(() => {
    getCustomersQuery("");
  }, []);

  let items = [];
  for (let number = 1; number <= pagination.total_pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === pagination.page}
        onClick={() => getCustomersQuery(query, number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Zip Code",
        accessor: "zip_code",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row: { original } }) => {
          return (
            <Button
              size="sm"
              onClick={() =>
                history.push(`invoices/?customerName=${original.first_name}`)
              }
            >
              <FontAwesomeIcon
                style={{ marginRight: 10 }}
                icon={faEdit}
                size={10}
                color="white"
              />
              Invoices
            </Button>
          );
        },
      },
    ],
    [history]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: customers });

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
      <h3 style={{ marginBottom: 20 }}>List of customers</h3>
      <Form>
        <Form.Group>
          <Form.Label>Search a customer</Form.Label>
          <Form.Control
            type="text"
            placeholder="First name or last name"
            onChange={debounce((e) => {
              setQuery(e.target.value);
              getCustomersQuery(e.target.value);
            }, 200)}
          />
        </Form.Group>
      </Form>
      {renderTable()}
      <Pagination style={{ marginTop: 20 }}>{items}</Pagination>
    </div>
  );
};

export default withRouter(CustomersList);
