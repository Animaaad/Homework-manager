import {useState} from "react"

const handleSubm = () => {
    alert(searchQuery);
}

function Registration() {
    const [submitQuery, setSubmitQuery] = useState("");
    return (
        <div className="register">
            <form onSubmit={handleSubm} className="enter-symbols">
                <input type="text"
                    placeholder="Enter username"
                    className="enter-username"
                    value={searchQuery}
                    onChange={(e) => submitQuery(e.target.value)}
                />
                <button type = "submit" className = "submit-button">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Registration