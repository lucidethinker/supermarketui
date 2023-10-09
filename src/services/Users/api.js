import Cookies from "js-cookie";

const url = "https://localhost:7274";

export async function SignUp(data) {
  return fetch(url + "/api/Users/Register", {
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
    method: "POST",
    ...{},
  });
}

export async function SignIn(data) {
  try {
    const response = await fetch(url + "/api/Users/Login", {
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (!response.ok) {
      // Log the error response for debugging purposes
      const errorResponse = await response.text();
      console.error(
        `HTTP error! Status: ${response.status}, Response: ${errorResponse}`
      );
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
export async function GetUser(id, userName = "") {
  return fetch(url + `/api/Users/GetUser/${id}/${userName}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      ...{},
    },
    ...{},
  });
}
export async function GetAllUser(search = "", orderBydesc = false) {
  var path = `/api/Users/GetAllUsers`;
  if (search != "") path += `/${search}`;
  if (orderBydesc) path += `/${orderBydesc}`;

  return fetch(url + path, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      ...{},
    },
    ...{},
  });
}
export async function DeleteUser(id) {
  return fetch(url + `/api/Users/DeleteUser/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      ...{},
    },
    ...{},
  });
}
export async function UpdateUser(data) {
  return fetch(url + `/api/Users/UpdateUser`, {
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
export async function ChangeUserStatus(id, status) {
  return fetch(url + `/api/Users/ChangeStatusUser/${id}/${status}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      ...{},
    },
    ...{},
  });
}
export function CheckUser(userType = 1) {
  return Cookies.get("loginUserType") == userType;
}
