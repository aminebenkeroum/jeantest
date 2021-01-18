import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useTable } from "react-table";
import { withRouter } from "react-router-dom";

import { Table, Pagination, Form, Button, Badge, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";

import { invoices as getInvoices } from "../../../services/api";
import CustomerSelect from "../components/CustomerSelect";

const useQuery = (location) => {
  return new URLSearchParams(location.search);
};

const InvoicesList = ({ history, location }) => {
  const [invoices, setInvoices] = useState([]);

  const params = useQuery(location);
  const customerName = params.get("customerName");

  const [query, setQuery] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 0,
    total_entries: 0,
    total_pages: 0,
  });

  const getInvoicesQuery = (query, page = 1, operator = "search_any", field) =>
    getInvoices(query, page, operator, field).then((response) => {
      if (response && response.invoices) {
        setInvoices(response.invoices);
        setPagination(response.pagination);
      }
    });

  useEffect(() => {
    if (customerName) {
      getInvoicesQuery(customerName, 1, "search", "customer.first_name");
    } else {
      getInvoicesQuery("", 1);
    }
  }, [customerName]);

  let items = [];
  for (let number = 1; number <= pagination.total_pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === pagination.page}
        onClick={() => getInvoicesQuery(query, number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Customer",
        accessor: "customer_id",
        Cell: ({ value: initialValue }) => {
          return <CustomerSelect size="sm" value={initialValue} readOnly />;
        },
      },
      {
        Header: "Paid",
        accessor: "paid",
        Cell: ({ value: initialValue }) => {
          return (
            <Badge variant={initialValue ? "success" : "danger"}>
              {initialValue ? "Paid" : "Not yet"}
            </Badge>
          );
        },
      },
      {
        Header: "Date of invoice",
        accessor: "date",
      },
      {
        Header: "Deadline",
        accessor: "deadline",
      },
      {
        Header: "Tax",
        accessor: "tax",
      },
      {
        Header: "Total",
        accessor: "total",
      },
      {
        Header: "Actions",
        accessor: "",
        Cell: ({ value: initialValue, row: { original } }) => {
          return (
            <Button
              size="sm"
              onClick={() =>
                history.push(`/invoices/${original.id}`, { invoice: original })
              }
            >
              <FontAwesomeIcon
                style={{ marginRight: 10 }}
                icon={faEdit}
                size={10}
                color="white"
              />
              Start invoicing
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
  } = useTable({ columns, data: invoices });

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
      <h3 style={{ marginBottom: 20 }}>
        List of invoices {customerName && `& Customer: ${customerName}`}
      </h3>
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Search an invoice</Form.Label>
            <Form.Control
              type="text"
              placeholder="Any query on invoice (Customer name for example)"
              onChange={debounce((e) => {
                setQuery(e.target.value);
                getInvoicesQuery(e.target.value);
              }, 200)}
            />
          </Form.Group>
        </Form.Row>
      </Form>
      <Button
        onClick={() => history.push("/invoices/create")}
        variant="primary"
        size="sm"
        style={{ float: "right", marginBottom: 20 }}
      >
        <FontAwesomeIcon
          style={{ marginRight: 10 }}
          icon={faPlus}
          size={10}
          color="white"
        />
        Create a new invoice
      </Button>
      {renderTable()}
      <Pagination style={{ marginTop: 20 }}>{items}</Pagination>
    </div>
  );
};

export default withRouter(InvoicesList);
