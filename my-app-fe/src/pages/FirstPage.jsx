import Registration from "../components/Registration"
import Navbar from '../components/ToRegistration'

function FirstPage() {
    return (
        <div>
            <Navbar/>
            <div className="firstPage">
                <Registration />
            </div>
        </div>
    )
}

export default FirstPage