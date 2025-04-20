import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { addHomework, getHomeworks, updateHomework } from '../services/homeworkService'

function THome(props) {
    const [homeworks, setHomeworks] = useState([]);
    const [assignmentDate, setAssignmentDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();



    const [displayedHomeworks, setDisplayedHomeworks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    let handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery("");
    }

    useEffect(() => {
        getHomeworks()
            .then((homeworks) => {
                console.log(homeworks)
                setDisplayedHomeworks(homeworks);
                //props.setError('');
            })
            .catch((error) => {
                console.log(error.message);
                //props.setError(error.message);
                setDisplayedHomeworks([]);
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
        if (!hw.is_saved) {
            console.log("qqqqqq")
            addHomework({
                "id": hw.id,
                "title": hw.title,
                "text": hw.text,
                "assignment_date": null,
                "due_date": null,
                "is_public": true
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
            "text": hw.text,
            "assignment_date": null,
            "due_date": null,
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
            showTitle: false, title: '', text: '',
            is_saved: false, is_public: false
        }]);
    };

    const handleToggleInput = (id) => {
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

    const handleDelete = (id) => {
        setHomeworks(homeworks.filter(hw => hw.id !== id));
    };

    const handleInputChange = (id, newText) => {
        setHomeworks(homeworks.map(hw =>
            hw.id === id
                ? { ...hw, text: newText }
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
        <div className="add-homeworks">
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
                            onClick={() => handleToggleInput(hw.id)}
                            className="toggle-input"
                        >
                            Toggle Input
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
                                        value={assignmentDate}
                                        onChange={(e) => setAssignmentDate(e.target.value)}
                                    />
                                </label>
                                <label>
                                    Due Date: &nbsp;
                                    <input
                                        type="datetime-local"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
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
                            value={hw.text}
                            onChange={(e) => handleInputChange(hw.id, e.target.value)}
                            placeholder="Type something..."
                            className="input"
                        />
                    )}

                </div>
            ))}
            <div className="hws">
                <form onSubmit={() => handleSearch}>
                    <input
                        type="text"
                        placeholder="Search for homeworks..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
                {displayedHomeworks.map((hw, index) =>
                    hw.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                        <div key={index}>
                            {hw.title} {hw.text}
                        </div>
                    )
                )}
                {/*<HomeworkList homeworks={homeworkss}></HomeworkList>*/}
            </div>
        </div>
    );
}

export { THome }
