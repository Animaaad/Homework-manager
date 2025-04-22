//const API_URL = process.env.REACT_APP_API_URL || "";

function login(username, password) {
  console.log("eeeee")
  return fetch(`$/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include"
  })
    .then((response) => {
      console.log(response)
      if (!response.ok) {
        // invalid password or user does not exist
        if (response.status === 401) {
          throw new Error("Invalid credentials");
        }
        throw new Error("Error logging in");
      }
      return response.json();
    })
}

function logout() {
  console.log("ooo")
  return fetch(`/api/v1/auth/logout`, { method: "DELETE", credentials: "include" })
    .then((response) => {  // promise is resolved
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Bad request - session does not exist");
        }
        throw new Error("Error logging out");
      }
    })
}

function addUser(user) {
  console.log("ffff")
  return fetch(`/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(user)
  })
    .then((response) => {
      if (!response.ok) { // HTTP status code NOT between 200-299
        throw new Error("Error getting messages");
      }
      console.log("Response ok");
      return response.json();
    }).catch((error) => { // promise is rejected
      // Better way would be to throw error here and let the
      // client handle (e.g. show error message)
      // Returning empty array for simplicity only!
      console.log(error);
    });
}

export function getCurrentUser() {
  return fetch(`/api/v1/auth/me`, {
    method: "GET",
    credentials: "include"
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Not authenticated");
    }
    return res.json(); // { user: { id, username, is_teacher } }
  });
}

export { login, logout, addUser };