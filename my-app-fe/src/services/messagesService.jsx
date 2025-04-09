
function getMessages() {
    return fetch('http://localhost:3000/api/v1/messages').then( // promise is resolved
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting messages");
            }
            return response.json();
        }).catch((error) => { // promise is rejected
            // Better way would be to throw error here and let the
            // client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("Error getting messages");
            return [];
        });
}

export default getMessages;