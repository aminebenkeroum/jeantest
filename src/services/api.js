import Http from "./http";

const API_URL = "https://jean-test-api.herokuapp.com";
const token = "97720dd2-60df-4c8a-a888-374bd8ec64f2";

export function customers(params) {
  return new Promise((resolve, reject) => {
    Http.get(`${API_URL}/customers/search`, {
      headers: {
        "X-SESSION": `${token}`,
      },
      params: params,
    })
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
}

export function products(params) {
  return new Promise((resolve, reject) => {
    Http.get(`${API_URL}/products/search`, {
      headers: {
        "X-SESSION": `${token}`,
      },
      params: params,
    })
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
}

export function invoices(query, page, operator, field) {
  return new Promise((resolve, reject) => {
    Http.get(`${API_URL}/invoices`, {
      headers: {
        "X-SESSION": `${token}`,
      },
      params: {
        search: JSON.stringify([
          {
            operator: operator,
            value: query,
            field,
          },
        ]),
        page,
      },
    })
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
}

export function createInvoice(params) {
  return new Promise((resolve, reject) => {
    Http.post(
      `${API_URL}/invoices`,
      {
        ...params,
      },
      {
        headers: {
          "X-SESSION": `${token}`,
        },
      }
    )
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
}

export function updateInvoice(id, params) {
  return new Promise((resolve, reject) => {
    Http.put(`${API_URL}/invoices/${id}`, params, {
      headers: {
        "X-SESSION": `${token}`,
      },
    })
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
}

export function getInvoice(id) {
  return new Promise((resolve, reject) => {
    Http.get(`${API_URL}/invoices/${id}`, {
      headers: {
        "X-SESSION": `${token}`,
      },
    })
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
}
