//const API_URL = process.env.REACT_APP_API_URL || "";

function getHomeworks() {

    return fetch(`/api/v1/homeworks`).then( // promise is resolved
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                if (response.status === 401 || response.status === 403) {
                    throw new Error("Not authenticated");
                }
                throw new Error("Error getting messages");
            }

            return response.json();
        });
}

function addHomework(homework) {
    console.log("addhw");
    return fetch(`/api/v1/homeworks`, {
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

function updateHomework(id, due_date, assignment_date, title, description, is_public) {
    console.log(id)
    return fetch(`/api/v1/homeworks/publish`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, due_date, assignment_date, title, description, is_public })
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

function deleteHomework(id) {
    console.log("delhw");
    return fetch(`/api/v1/homeworks/delete`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id)
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

function addStudentHomework(hw) {
    console.log(hw)
    return fetch(`/api/v1/homeworks/student`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(hw)
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

function getStudentHomeworks() {
    return fetch(`/api/v1/homeworks/student`).then( // promise is resolved
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting messages");
            }
            console.log("hahaha");
            return response.json();
        }).catch((error) => { // promise is rejected
            // Better way would be to throw error here and let the
            // client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("Error getting messagesayaya");
            return [];
        });
}


function editNote(hw) {
    console.log(hw)
    return fetch(`/api/v1/homeworks/student/update`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(hw)
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

function addSubject(subject) {
    console.log("addsj");
    return fetch(`/api/v1/homeworks/subjects`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(subject)
    }).then((response) => {  // promise is resolved
        if (!response.ok) {
            // Forward error details to outer catch
            return response.json().then(err => {
              const error = new Error(err.error || 'Request failed');
              error.response = { status: response.status };
              throw error;
            });
          }
          return response.json();
    });
}

function getSubjects() {

    return fetch(`/api/v1/homeworks/subjects`).then( // promise is resolved
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                if (response.status === 401 || response.status === 403) {
                    throw new Error("Not authenticated");
                }
                throw new Error("Error getting messages");
            }

            return response.json();
        });
}

function changeCompletion(id, completed) {
    console.log(id)
    return fetch(`/api/v1/homeworks/student/completion`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, completed })
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

export {
    getHomeworks, addHomework, updateHomework,
    addStudentHomework, getStudentHomeworks, editNote, deleteHomework,
    addSubject, getSubjects, changeCompletion
}