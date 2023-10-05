import request from "request-utils";
const url = "http://127.0.0.1:5173";

export async function AddOrder(data) {
  return request(url + `/api/Orders/AddOrder`, {
    data,
    method: "POST",
    ...{},
  });
}
export async function GetOrder(id) {
  return request(url + `/api/Orders/GetOrder/${id}`, {
    method: "GET",
    ...{},
  });
}
export async function GetAllOrders() {
  return request(url + `/api/Orders/GetAllOrders`, {
    method: "GET",
    ...{},
  });
}
export async function DeleteOrder(id) {
  return request(url + `/api/Orders/DeleteOrder/${id}`, {
    method: "DELETE",
    ...{},
  });
}
export async function ChangeOrderStatus(data) {
  return request(url + `/api/Orders/ChangeOrderStatus`, {
    data,
    method: "POST",
    ...{},
  });
}
