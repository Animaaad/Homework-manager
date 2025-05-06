import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { addHomework, getHomeworks, getSubjects, updateHomework, deleteHomework } from '../services/homeworkService';

function SavedHomeworks() {
    const [homeworks, setHomeworks] = useState([]);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getHomeworks()
            .then((homeworks) => {
                setHomeworks(homeworks.filter(hw => hw.is_public === false));
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
        setHomeworks(homeworks.map(hw2 =>
            hw2.id === hw.id ? { ...hw2, is_saved: true, is_public: true } : hw2
        ));
        if (!hw.is_saved) {
            addHomework({
                id: hw.id,
                title: hw.title,
                description: hw.description,
                assignment_date: hw.assign_date,
                due_date: hw.due_date,
                is_public: true,
                subject: hw.subject
            }).catch((error) => {
                console.log(error.message);
            });
        } else {
            updateHomework(hw.id);
        }
    }

    function saveDraft(hw) {
        setHomeworks(homeworks.map(hw2 =>
            hw2.id === hw.id ? { ...hw2, is_saved: true } : hw2
        ));
        if (!hw.is_saved) {
            addHomework({
                id: hw.id,
                title: hw.title,
                description: hw.description,
                assignment_date: hw.assign_date,
                due_date: hw.due_date,
                is_public: false,
                subject: hw.subject
            }).catch((error) => {
                console.log(error.message);
            });
        } else {
            updateHomework(hw.id);
        }
    }

    const handleToggleDescription = (id) => {
        setHomeworks(homeworks.map(hw2 =>
            hw2.id === id ? { ...hw2, showInput: !hw2.showInput } : hw2
        ));
    };

    const handleToggleTitle = (id) => {
        setHomeworks(homeworks.map(hw2 =>
            hw2.id === id ? { ...hw2, showTitle: !hw2.showTitle } : hw2
        ));
    };

    const handleToggleDates = (id) => {
        setHomeworks(homeworks.map(hw2 =>
            hw2.id === id ? { ...hw2, showDates: !hw2.showDates } : hw2
        ));
    };

    const handleDueDateChange = (id, value) => {
        setHomeworks(homeworks.map(hw2 =>
            hw2.id === id ? { ...hw2, due_date: value } : hw2
        ));
    };

    const handleAssignDateChange = (id, value) => {
        setHomeworks(homeworks.map(hw2 =>
            hw2.id === id ? { ...hw2, assign_date: value } : hw2
        ));
    };

    const handleDelete = (id) => {
        setHomeworks(homeworks.filter(hw2 => hw2.id !== id));
        deleteHomework({ id });
    };

    const handleInputChange = (id, newText) => {
        setHomeworks(homeworks.map(hw2 =>
            hw2.id === id ? { ...hw2, description: newText } : hw2
        ));
    };

    const handleTitleChange = (id, newText) => {
        setHomeworks(homeworks.map(hw2 =>
            hw2.id === id ? { ...hw2, title: newText } : hw2
        ));
    };

    /*const options = [
        { code: "2-INF-186/15", name: "Formálne jazyky a automaty (2)" },
        { code: "2-INF-145/15", name: "Tvorba internetových aplikácií" },
    ];*/

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

    const toggleSubject = (hw) => {
        setHomeworks(homeworks.map(hw2 =>
            hw2.id === hw.id
                ? { ...hw2, showSubject: !hw2.showSubject }
                : hw2
        ));
    };

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
            {homeworks.map((hw) => (
                <div key={hw.id} className="add-hws">
                    <div className="features">
                        <button onClick={() => handleToggleTitle(hw.id)} className="toggle-title">
                            Toggle Title
                        </button>

                        <button
                            onClick={() => toggleSubject(hw)}
                            className="w-full border rounded px-4 py-2 bg-white shadow text-left"
                        >
                            {getSubjectLabel(hw.subject?.code)}
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

                        <button onClick={() => handleToggleDescription(hw.id)} className="toggle-input">
                            Toggle Description
                        </button>
                        <button onClick={() => handleToggleDates(hw.id)} className="toggle-dates">
                            Toggle Dates
                        </button>

                        {!hw.is_public && (
                            <button onClick={() => handleDelete(hw.id)} className="delete">
                                ❌
                            </button>
                        )}

                        <button className="Publish" onClick={() => publishNewHomework(hw)}>
                            Publish
                        </button>
                        <button className="Publish" onClick={() => saveDraft(hw)}>
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
                            type="text"
                            value={hw.title}
                            onChange={(e) => handleTitleChange(hw.id, e.target.value)}
                            placeholder="Title:..."
                            className="input"
                        />
                    )}

                    {hw.showInput && (
                        <input
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
    );
}

export { SavedHomeworks };