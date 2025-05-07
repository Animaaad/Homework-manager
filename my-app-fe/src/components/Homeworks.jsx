import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { addHomework, updateHomework, getSubjects, getHomeworks } from '../services/homeworkService'



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
                "assignment_date": hw.assignment_date,
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

        getHomeworks()
            .then((homeworks1) => {
                console.log(homeworks1)
                props.setPublishedHomeworks(homeworks1.filter(hw => hw.is_public === true));
                //props.setError('');
            })
            .catch((error) => {
                console.log(error.message);
                //props.setError(error.message);
                props.setPublishedHomeworks([]);
                if (error.message === 'Not authenticated') {
                    //props.setAuthStatus(false);
                    //navigate("/");
                }
            })
        setHomeworks(homeworks.filter(hw2 => hw2.id !== hw.id));

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
                "assignment_date": hw.assignment_date,
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

        getHomeworks()
            .then((homeworks1) => {
                props.setSavedHomeworks(homeworks1.filter(hw => hw.is_public === false));
            })
            .catch((error) => {
                console.log(error.message);
                props.setError(error.message)
                props.setSavedHomeworks([]);
                if (error.message === 'Not authenticated') {
                    navigate("/");
                }
            });
        setHomeworks(homeworks.filter(hw2 => hw2.id !== hw.id));
    }

    const handleAddHomework = () => {
        const id = crypto.randomUUID(); // Unique ID
        setHomeworks([...homeworks, {
            id, showInput: false, showDates: false,
            showTitle: false, title: '', description: '',
            is_saved: false, is_public: false, due_date: '',
            assignment_date: '', subject: { code: '', name: '' },
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
            hw.id === id ? { ...hw, assignment_date: value } : hw
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
        <div className="container mt-4">
            <button onClick={handleAddHomework} className="btn btn-primary mb-3">
                Add Homework
            </button>

            {homeworks.map((hw) => (
                <div key={hw.id} className="card mb-3">
                    <div className="card-body">
                        <div className="d-flex flex-wrap gap-2 mb-3">
                            <button onClick={() => handleToggleTitle(hw.id)} className="btn btn-secondary">
                                Toggle Title
                            </button>

                            <div className="position-relative">
                                <button onClick={() => toggleSubject(hw)} className="btn btn-light border">
                                    {getSubjectLabel(hw.subject.code)}
                                </button>
                                {hw.showSubject && (
                                    <ul className="list-group position-absolute mt-1" style={{ zIndex: 1000, maxHeight: '160px', overflowY: 'auto' }}>
                                        {options.map((option) => (
                                            <li
                                                key={option.code}
                                                className="list-group-item list-group-item-action"
                                                onClick={() => handleSelect(hw, option)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {option.code} - {option.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <button onClick={() => handleToggleDescription(hw.id)} className="btn btn-secondary">
                                Toggle Description
                            </button>

                            <button onClick={() => handleToggleDates(hw.id)} className="btn btn-secondary">
                                Toggle Dates
                            </button>

                            {!hw.is_public && (
                                <button onClick={() => handleDelete(hw.id)} className="btn btn-danger">
                                    ❌
                                </button>
                            )}

                            <button className="btn btn-success" onClick={() => publishNewHomework(hw)}>
                                Publish
                            </button>

                            <button className="btn btn-outline-primary" onClick={() => saveDraft(hw)}>
                                Save Draft
                            </button>
                        </div>

                        {hw.showDates && (
                            <div className="mb-3">
                                <div className="mb-2">
                                    <label className="form-label">Assignment Date:</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={hw.assignment_date}
                                        onChange={(e) => handleAssignDateChange(hw.id, e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Due Date:</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={hw.due_date}
                                        onChange={(e) => handleDueDateChange(hw.id, e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {hw.showTitle && (
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={hw.title}
                                onChange={(e) => handleTitleChange(hw.id, e.target.value)}
                                placeholder="Title..."
                            />
                        )}

                        {hw.showInput && (
                            <input
                                type="text"
                                className="form-control"
                                value={hw.description}
                                onChange={(e) => handleInputChange(hw.id, e.target.value)}
                                placeholder="Type something..."
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export { Homeworks };  