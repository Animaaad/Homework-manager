import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { addHomework, getHomeworks, updateHomework } from '../services/homeworkService'

function PublishedHomeworks() {

    const [homeworks, setHomeworks] = useState([]);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");

    let handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery("");
    }

    useEffect(() => {
        getHomeworks()
            .then((homeworks) => {
                console.log(homeworks)
                setHomeworks(homeworks.filter(hw => hw.is_public === true));
                //props.setError('');
            })
            .catch((error) => {
                console.log(error.message);
                //props.setError(error.message);
                setHomeworks([]);
                if (error.message === 'Not authenticated') {
                    //props.setAuthStatus(false);
                    navigate("/");
                }
            })
    }, []);

    function publishNewHomework(hw) {
        console.log(hw.id)
        setHomeworks(homeworks.map(hw2 =>
            hw2.id === hw.id ? { ...hw2, is_saved: true, is_public: true } : hw2
        ));

        const oldDate = new Date(hw.due_date);
        const newDueDate = new Date(hw.newDate);
        console.log(hw.due_date)
        console.log(newDueDate)
        if (newDueDate >= oldDate) {
            setHomeworks(homeworks.map(hw3 =>
                hw3.id === hw.id ? { ...hw3, due_date: newDueDate } : hw3
            ));
            console.log(hw.due_date)
            updateHomework(hw.id, newDueDate)
        }
        else {
            alert("Due date can only be postponed.");
        }
    }

    const handleToggleDescription = (id) => {
        setHomeworks(homeworks.map(hw =>
            hw.id === id ? { ...hw, showInput: !hw.showInput } : hw
        ));
    };

    const handleToggleTitle = (id) => {
        setHomeworks(homeworks.map(hw =>
            hw.id === id ? { ...hw, showTitle: !hw.showTitle } : hw
        ));
    };

    const handleToggleDates = (id) => {
        setHomeworks(homeworks.map(hw =>
            hw.id === id ? { ...hw, showDates: !hw.showDates } : hw))
    }

    const handleDueDateChange = (id, newDate) => {
        setHomeworks(prev =>
            prev.map(hw => hw.id === id ? 
                 { ...hw, newDate: newDate } : hw
            ));
    };

    const handleDelete = (id) => {
        setHomeworks(homeworks.filter(hw => hw.id !== id));
    };

    const formatForDatetimeLocal = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const offset = date.getTimezoneOffset(); // local timezone adjustment
        const localDate = new Date(date.getTime() - offset * 60 * 1000);
        return localDate.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:mm'
    };

    return (
        <div className="homeworks">
            {homeworks.map((hw) => (
                <div key={hw.id} className="add-hws">
                    <div className="features">
                        <button
                            onClick={() => handleToggleTitle(hw.id)}
                            className="toggle-title"
                        >
                            Toggle Title
                        </button>
                        <button
                            onClick={() => handleToggleDescription(hw.id)}
                            className="toggle-input"
                        >
                            Toggle Description
                        </button>
                        <button
                            onClick={() => handleToggleDates(hw.id)}
                            className="toggle-dates"
                        >
                            Toggle Dates
                        </button>
                        {!hw.is_public && (<button
                            onClick={() => handleDelete(hw.id)}
                            className="delete"
                        >
                            ❌
                        </button>)}
                        <button className='Publish' onClick={() => publishNewHomework(hw)}>
                            Save changes
                        </button>
                        
                        {hw.showDates && (
                            <div>
                                <label>
                                    Assignment Date: &nbsp;
                                    <input
                                        type="datetime-local"
                                        value={formatForDatetimeLocal(hw.assign_date)}
                                        disabled
                                    />
                                </label>
                                <label>
                                    Due Date: &nbsp;
                                    <input
                                        type="datetime-local"
                                        value={formatForDatetimeLocal(hw.newDate) || formatForDatetimeLocal(hw.due_date)}
                                        onChange={(e) => handleDueDateChange(hw.id, e.target.value)}
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    {hw.showTitle && hw.title}

                    {hw.showInput && hw.description}

                </div>
            ))}
        </div>
    )
}

export { PublishedHomeworks };