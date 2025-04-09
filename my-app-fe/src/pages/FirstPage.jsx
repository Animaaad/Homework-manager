import Registration from "../components/Registration"
import ToRegistation from '../components/ToRegistration'
import {getMessages} from '../services/messagesService'
import { useEffect, useState } from 'react';

function FirstPage() {

    const [messages, setMessages] = useState([]);
    useEffect(() => {
        getMessages().then(
            (messages) => setMessages(messages)
        );
        const fetchMessagesInterval = setInterval(() => {
            getMessages().then(
                (messages) => setMessages(messages)
            );
        }, 10000);
        return () => clearInterval(fetchMessagesInterval);
    }, []);

    return (
        <div>
            <ToRegistation />
            <div className="firstPage">
                <Registration />
            </div>
            <div>
                <h1>{messages}</h1>
            </div>
        </div>
    )
}

export default FirstPage