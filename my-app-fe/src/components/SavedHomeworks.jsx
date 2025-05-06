import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { addHomework, getHomeworks, getSubjects, updateHomework, deleteHomework } from '../services/homeworkService';

function SavedHomeworks(props) {
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
                props.setError(error.message)
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
        <div className="container mt-4">
            {homeworks.map((hw) => (
                <div key={hw.id} className="card mb-4 shadow-sm">
                    <div className="card-body">
                        <div className="d-flex flex-wrap gap-2 mb-3">
                            <button onClick={() => handleToggleTitle(hw.id)} className="btn btn-outline-primary btn-sm">
                                Toggle Title
                            </button>

                            <div className="position-relative">
                                <button
                                    onClick={() => toggleSubject(hw)}
                                    className="btn btn-outline-secondary btn-sm"
                                >
                                    {getSubjectLabel(hw.subject?.code) || "Select Subject"}
                                </button>

                                {hw.showSubject && (
                                    <ul className="list-group position-absolute mt-1 shadow" style={{ zIndex: 1000, maxHeight: '160px', overflowY: 'auto', width: '100%' }}>
                                        {options.map((option) => (
                                            <li
                                                key={option.code}
                                                onClick={() => handleSelect(hw, option)}
                                                className="list-group-item list-group-item-action"
                                                style={{ cursor: "pointer" }}
                                            >
                                                {option.code} - {option.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <button onClick={() => handleToggleDescription(hw.id)} className="btn btn-outline-primary btn-sm">
                                Toggle Description
                            </button>
                            <button onClick={() => handleToggleDates(hw.id)} className="btn btn-outline-primary btn-sm">
                                Toggle Dates
                            </button>

                            {!hw.is_public && (
                                <button onClick={() => handleDelete(hw.id)} className="btn btn-outline-danger btn-sm">
                                    ❌
                                </button>
                            )}

                            <button className="btn btn-success btn-sm" onClick={() => publishNewHomework(hw)}>
                                Publish
                            </button>
                            <button className="btn btn-secondary btn-sm" onClick={() => saveDraft(hw)}>
                                Save Draft
                            </button>
                        </div>

                        {hw.showDates && (
                            <div className="row mb-3">
                                <div className="col-md-6 mb-2">
                                    <label className="form-label">Assignment Date</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={hw.assign_date}
                                        onChange={(e) => handleAssignDateChange(hw.id, e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label className="form-label">Due Date</label>
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
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Title..."
                                    value={hw.title}
                                    onChange={(e) => handleTitleChange(hw.id, e.target.value)}
                                />
                            </div>
                        )}

                        {hw.showInput && (
                            <div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type something..."
                                    value={hw.description}
                                    onChange={(e) => handleInputChange(hw.id, e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export { SavedHomeworks };