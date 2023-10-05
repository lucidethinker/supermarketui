const url = "https://localhost:7274";

export async function CreateProduct(data) {
  return fetch(url + "/api/Products/CreateProduct", {
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    method: "POST",
    ...{},
  });
}
export async function UpdateProduct(data) {
  return fetch(url + "/api/Products/UpdateProduct", {
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    method: "POST",
    ...{},
  });
}
export async function DeleteProduct(id) {
  return fetch(url + `/api/Products/DeleteProduct/${id}`, {
    method: "DELETE",
    ...{},
  });
}
export async function GetProduct(id, productName = "") {
  return fetch(url + `/api/Products/GetProduct/${id}/${productName}`, {
    method: "GET",
    ...{},
  });
}
export async function GetAllProducts(id = 0, search = "", orderBydesc = false) {
  var path = `/api/Products/GetAllProducts`;
  if (id > 0) path = path + `/${id}`;
  if (search != "") path = path + `/${search}`;
  if (orderBydesc) path = path + `/${orderBydesc}`;
  return fetch(
    url + path,
    {
      method: "GET",
      ...{},
    }
  );
}
export async function GetAllProductCategories() {
  return fetch(url + "/api/Products/GetAllProductsCategories", {
    method: "GET",
    ...{},
  });
}
export async function DeleteProductCategory(id) {
  return fetch(url + `/api/Products/DeleteProductCategory/${id}`, {
    method: "DELETE",
    ...{},
  });
}
export async function AddCategory(data) {
  return fetch(url + "/api/Products/AddProductCategory", {
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    method: "POST",
    ...{},
  });
}
