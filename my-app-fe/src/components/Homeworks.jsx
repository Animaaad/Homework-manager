import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { addHomework, updateHomework, getSubjects } from '../services/homeworkService'



function Homeworks(props) {
    const [homeworks, setHomeworks] = useState([]);
    const [options, setOptions] = useState([]);
    useEffect(() => {
        getSubjects()
            .then((sjs) => {
                setOptions(sjs);
            })
            .catch((error) => {
                console.log(error.message);
                setHomeworks([]);
                if (error.message === 'Not authenticated') {
                    navigate("/");
                }
            });
    }, []);

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
                "subject": hw.subject
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
        if (!hw.is_saved) {
            console.log("adding")
            addHomework({
                "id": hw.id,
                "title": hw.title,
                "description": hw.description,
                "assignment_date": hw.assign_date,
                "due_date": hw.due_date,
                "is_public": false,
                "subject": hw.subject
            })
                .catch((error) => {
                    console.log(error.message);
                })
        } else {
            console.log(hw.id)
            updateHomework(hw.id)
        }
    }

    const handleAddHomework = () => {
        const id = crypto.randomUUID(); // Unique ID
        setHomeworks([...homeworks, {
            id, showInput: false, showDates: false,
            showTitle: false, title: '', description: '',
            is_saved: false, is_public: false, due_date: '',
            assign_date: '', subject: { code: '', name: '' },
            showSubject: false
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

    const toggleSubject = (hw) => {
        console.log("aaaaaa")
        setHomeworks(homeworks.map(hw2 =>
            hw2.id === hw.id
                ? { ...hw2, showSubject: !hw2.showSubject }
                : hw2
        ))
    };;

    const handleSelect = (hw, option) => {
        setHomeworks(homeworks.map(hw2 =>
            hw2.id === hw.id
                ? { ...hw2, subject: option, showSubject: false }
                : hw2
        ));
    };

    const getSubjectLabel = (code) => {
        const match = options.find(opt => opt.code === code);
        return match ? `Subject: ${match.name}` : "Select a subject";
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
                            onClick={() => toggleSubject(hw)}
                            className="w-full border rounded px-4 py-2 bg-white shadow text-left"
                        >
                            {getSubjectLabel(hw.subject.code)}
                        </button>

                        {hw.showSubject && (
                            <ul className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto border bg-white shadow rounded">
                                {options.map((option) => (
                                    <li
                                        key={option.code}
                                        onClick={() => handleSelect(hw, option)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {option.code} - {option.name}
                                    </li>
                                ))}
                            </ul>
                        )}
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

export { Homeworks };  