import { useState, useEffect } from 'react';
import { addHomework } from '../services/homeworkService'

function THome() {
    const [homeworks, setHomeworks] = useState([]);
    const [assignmentDate, setAssignmentDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    function publishNewHomework(hw) {
        console.log(hw)
        addHomework({
            "id": hw.id,
            "title": hw.title,
            "text": hw.text,
            "assignment_date": null,
            "due_date": null
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
                        <button
                            onClick={() => handleDelete(hw.id)}
                            className="delete"
                        >
                            ❌
                        </button>
                        <button className='Publish' onClick={() => publishNewHomework(hw)}>
                            Publish
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
        </div>
    );
}

export { THome }
