import ToLogin from "../components/ToLogin";
import ToRegistration from '../components/ToRegistration'
//import {getMessages} from '../services/homeworkService'
import { useEffect, useState } from 'react';

function FirstPage() {

    const [messages, setMessages] = useState([]);
    /*useEffect(() => {
        getMessages().then(
            (messages) => setMessages(messages)
        );
        const fetchMessagesInterval = setInterval(() => {
            getMessages().then(
                (messages) => setMessages(messages)
            );
        }, 10000);
        return () => clearInterval(fetchMessagesInterval);
    }, []);*/

    return (
        <div>
            <div className="firstPage">
                <ToRegistration />
            </div>
            <div className="firstPage">
                <ToLogin />
            </div>
            <div>
                <h1>{messages}</h1>
            </div>
        </div>
    )
}

export default FirstPage