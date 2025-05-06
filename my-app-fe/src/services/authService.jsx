//const API_URL = process.env.REACT_APP_API_URL || "";

function login(username, password) {
  console.log("eeeee")
  return fetch(`/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include"
  })
    .then((response) => {
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
  console.log("ffff");
  return fetch(`/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(user)
  })
    .then((response) => {
      if (!response.ok) {
        // Forward error details to outer catch
        return response.json().then(err => {
          const error = new Error(err.error || 'Request failed');
          error.response = { status: response.status };
          throw error;
        });
      }
      console.log("Response ok");
      return response.json();
    });
}

export function getCurrentUser() {

  return fetch(`/api/v1/auth/me`, {
    method: "GET",
    credentials: "include"
  }).then((res) => {

    if (!res.ok) {
      console.log("whyayaya")
      throw new Error("Not authenticated");
    }
    return res.json();
  });
}

export { login, logout, addUser };