
function getHomeworks() {
    console.log("oyoyoayaya");
    return fetch('api/v1/homeworks').then( // promise is resolved
        
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

/*function addMessage(message) {
    return fetch("http://localhost:3001/api/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message)
    });
}
*/
export {getHomeworks}