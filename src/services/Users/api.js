const url = "https://localhost:7274";

export async function SignUp(data) {
  return fetch(url + "/api/Users/Register", {
    body : JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    method: "POST",
    ...{},
  });
}
export async function SignIn(data) {
  return fetch(url + "/api/Users/Login",{
    body : JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    method: "POST",
    ...{},
  });
}
export async function GetUser(id, userName = "") {
  return fetch(url + `/api/Users/GetUser/${id}/${userName}`, {
    method: "GET",
    ...{},
  });
}
export async function GetAllUser(search = "", orderBydesc = false) {
  var path = `/api/Users/GetAllUsers`;
  if(search != "")
    path += `/${search}`;
  if(orderBydesc)
    path+= `/${orderBydesc}`;
  return fetch(url + path, {
    method: "GET",
    ...{},
  });
}
export async function DeleteUser(id) {
  return fetch(url + `/api/Users/DeleteUser/${id}`, {
    method: "DELETE",
    ...{},
  });
}
export async function UpdateUser(data) {
  return fetch(url + `/api/Users/UpdateUser`, {
    body : JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    method: "POST",
    ...{},
  });
}
export async function ChangeUserStatus(id,status) {
  return fetch(url + `/api/Users/ChangeStatusUser/${id}/${status}`, {
    method: "GET",
    ...{},
  });
}
