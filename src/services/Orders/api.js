const url = "https://localhost:7274";

export async function AddOrder(data) {
  return fetch(url + `/api/Orders/AddOrder`, {
    body:JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    method: "POST",
    ...{},
  });
}
export async function GetOrder(id) {
  return fetch(url + `/api/Orders/GetOrder/${id}`, {
    method: "GET",
    ...{},
  });
}
export async function GetAllOrders() {
  return fetch(url + `/api/Orders/GetAllOrders`, {
    method: "GET",
    ...{},
  });
}
export async function DeleteOrder(id) {
  return fetch(url + `/api/Orders/DeleteOrder/${id}`, {
    method: "DELETE",
    ...{},
  });
}
export async function ChangeOrderStatus(data) {
  return fetch(url + `/api/Orders/ChangeOrderStatus`, {
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    method: "POST",
    ...{},
  });
}
export async function GetInvNo() {
  return fetch(url + "/api/Orders/GetInvoiceNo", {
    method: "GET",
    ...{},
  });
}
