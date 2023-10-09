import Cookies from "js-cookie";

const url = "https://localhost:7274";

export async function CreateProduct(data) {
  return fetch(url + "/api/Products/CreateProduct", {
    body: JSON.stringify(data),

    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      ...{},
    },
    ...{},
  });
}
export async function UpdateProduct(data) {
  return fetch(url + "/api/Products/UpdateProduct", {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      ...{},
    },
    method: "POST",
    ...{},
  });
}
export async function DeleteProduct(id) {
  return fetch(url + `/api/Products/DeleteProduct/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      ...{},
    },
    ...{},
  });
}
export async function GetProduct(id, productName = "") {
  return fetch(url + `/api/Products/GetProduct/${id}/${productName}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      ...{},
    },
    ...{},
  });
}
export async function GetAllProducts(id = 0, search = "", orderBydesc = false) {
  var path = `/api/Products/GetAllProducts`;
  if (id > 0) path = path + `/${id}`;
  if (search != "") path = path + `/${search}`;
  if (orderBydesc) path = path + `/${orderBydesc}`;
  return fetch(url + path, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      ...{},
    },
    ...{},
  });
}
export async function GetAllProductCategories() {
  return fetch(url + "/api/Products/GetAllProductsCategories", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      ...{},
    },
    ...{},
  });
}
export async function DeleteProductCategory(id) {
  return fetch(url + `/api/Products/DeleteProductCategory/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      ...{},
    },
    ...{},
  });
}
export async function AddCategory(data) {
  return fetch(url + "/api/Products/AddProductCategory", {
    body: JSON.stringify(data),

    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      ...{},
    },

    ...{},
  });
}
