import ToRegistration from "./ToRegistration"

function Registration() {
    function reg() {
        <ToRegistration/>
    }

    return <div className="student-registration">
        <button className="register-btn" onClick={reg}>
            student registration 
        </button>
    </div>
}

export default Registration