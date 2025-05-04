import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { addHomework, getHomeworks, updateHomework } from '../services/homeworkService'



function Homeworks(props) {
    const [homeworks, setHomeworks] = useState([]);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");

    let handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery("");
    }

    function publishNewHomework(hw) {
        console.log(hw.id)
        setHomeworks(homeworks.map(hw2 =>
            hw2.id === hw.id ? { ...hw2, is_saved: true, is_public: true } : hw2
        ));
        if (!hw.is_saved) {
            console.log("qqqqqq")
            addHomework({
                "id": hw.id,
                "title": hw.title,
                "description": hw.description,
                "assignment_date": hw.assign_date,
                "due_date": hw.due_date,
                "is_public": true,
                //"subject": hw.subject
            })
                .catch((error) => {
                    console.log(error.message);
                })
        } else {
            console.log(hw.id)
            updateHomework(hw.id)
        }
    }

    function saveDraft(hw) {
        console.log(hw)
        setHomeworks(homeworks.map(hw2 =>
            hw2.id === hw.id ? { ...hw2, is_saved: true } : hw2
        ));
        addHomework({
            "id": hw.id,
            "title": hw.title,
            "description": hw.description,
            "assignment_date": hw.due_date,
            "due_date": hw.assign_date,
            "is_public": false
        })
            .catch((error) => {
                console.log(error.message);
            })
    }

    const handleAddHomework = () => {
        const id = Date.now(); // Unique ID
        setHomeworks([...homeworks, {
            id, showInput: false, showDates: false,
            showTitle: false, title: '', description: '',
            is_saved: false, is_public: false, due_date: '',
            assign_date: ''
        }]);
    };

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

    const handleDueDateChange = (id, value) => {
        setHomeworks(homeworks.map(hw =>
            hw.id === id ? { ...hw, due_date: value } : hw
        ));
    };

    const handleAssignDateChange = (id, value) => {
        setHomeworks(homeworks.map(hw =>
            hw.id === id ? { ...hw, assign_date: value } : hw
        ));
    };

    const handleDelete = (id) => {
        setHomeworks(homeworks.filter(hw => hw.id !== id));
    };

    const handleInputChange = (id, newText) => {
        setHomeworks(homeworks.map(hw =>
            hw.id === id
                ? { ...hw, description: newText }
                : hw
        ));
    };

    const handleTitleChange = (id, newText) => {
        setHomeworks(homeworks.map(hw =>
            hw.id === id
                ? { ...hw, title: newText }
                : hw
        ));
    };

    return (
        <div className="homeworks">
            <button
                onClick={handleAddHomework}
                className="add-homework"
            >
                Add Homework
            </button>
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
                            Toggle Descrition
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
                            Publish
                        </button>
                        <button className='Publish' onClick={() => saveDraft(hw)}>
                            Save Draft
                        </button>
                        {hw.showDates && (
                            <div>
                                <label>
                                    Assignment Date: &nbsp;
                                    <input
                                        type="datetime-local"
                                        value={hw.assign_date}
                                        onChange={(e) => handleAssignDateChange(hw.id, e.target.value)}
                                    />
                                </label>
                                <label>
                                    Due Date: &nbsp;
                                    <input
                                        type="datetime-local"
                                        value={hw.due_date}
                                        onChange={(e) => handleDueDateChange(hw.id, e.target.value)}
                                    />
                                </label>
                            </div>
                        )}
                    </div>

                    {hw.showTitle && (
                        <input
                            id="message-text"
                            type="text"
                            value={hw.title}
                            onChange={(e) => handleTitleChange(hw.id, e.target.value)}
                            placeholder="Title:..."
                            className="input"
                        />
                    )}

                    {hw.showInput && (
                        <input
                            id="message-text"
                            type="text"
                            value={hw.description}
                            onChange={(e) => handleInputChange(hw.id, e.target.value)}
                            placeholder="Type something..."
                            className="input"
                        />
                    )}

                </div>
            ))}
        </div>
    )
}

export {Homeworks};  