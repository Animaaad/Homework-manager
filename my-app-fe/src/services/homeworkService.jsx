const API_URL = process.env.REACT_APP_API_URL || "";

function getHomeworks() {
    
    return fetch(`${API_URL}api/v1/homeworks`).then( // promise is resolved
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting messages");
            }
            console.log("Response ok"); 
            return response.json();
        }).catch((error) => { // promise is rejected
            // Better way would be to throw error here and let the
            // client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("Error getting messagesayaya");
            return [];
        });
}

function addHomework(homework) {
    console.log("addhw");
    return fetch(`${API_URL}api/v1/homeworks`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(homework)
    }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // "unauthorized" or "unauthenticated" HTTP status
            if (response.status === 401 || response.status === 403) {
                throw new Error("Not authenticated");
            }
            // other error HTTP status
            throw new Error("Error adding new message");
        }
    });
}

function updateHomework(id) {
    console.log(id)
    return fetch(`${API_URL}api/v1/publish`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id })
    }).then((response) => { // promise is resolved
        if (!response.ok) {
            // "unauthorized" or "unauthenticated" HTTP status
            if (response.status === 401 || response.status === 403) {
                throw new Error("Not authenticated");
            }
            // other error HTTP status
            throw new Error("Error adding new message");
        }
    });
}

export {getHomeworks, addHomework, updateHomework}