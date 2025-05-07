import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { addHomework, getHomeworks, updateHomework } from '../services/homeworkService'

function PublishedHomeworks(props) {

    //const [props.publishedHomeworks, props.setPublishedHomeworks] = useState([]);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");

    let handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery("");
    }

    useEffect(() => {
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
    }, []);

    function publishNewHomework(hw) {
        console.log(hw.id)
        props.setPublishedHomeworks(props.publishedHomeworks.map(hw2 =>
            hw2.id === hw.id ? { ...hw2, is_saved: true, is_public: true } : hw2
        ));

        const oldDate = new Date(hw.due_date);
        const newDueDate = new Date(hw.newDate);
        console.log(hw.due_date)
        console.log(newDueDate)
        if (newDueDate >= oldDate) {
            props.setPublishedHomeworks(props.publishedHomeworks.map(hw3 =>
                hw3.id === hw.id ? { ...hw3, due_date: newDueDate } : hw3
            ));
            console.log(hw.title)
            updateHomework(hw.id, newDueDate, hw.assignment_date, hw.title, hw.description, true)
        }
        else {
            alert("Due date can only be postponed.");
        }
    }

    const handleToggleDescription = (id) => {
        props.setPublishedHomeworks(props.publishedHomeworks.map(hw =>
            hw.id === id ? { ...hw, showInput: !hw.showInput } : hw
        ));
    };

    const handleToggleSubject = (id) => {
        props.setPublishedHomeworks(props.publishedHomeworks.map(hw =>
            hw.id === id ? { ...hw, showSubject: !hw.showSubject } : hw
        ));
    }

    const handleToggleTitle = (id) => {
        props.setPublishedHomeworks(props.publishedHomeworks.map(hw =>
            hw.id === id ? { ...hw, showTitle: !hw.showTitle } : hw
        ));
    };

    const handleToggleDates = (id) => {
        props.setPublishedHomeworks(props.publishedHomeworks.map(hw =>
            hw.id === id ? { ...hw, showDates: !hw.showDates } : hw))
    }

    const handleDueDateChange = (id, newDate) => {
        props.setPublishedHomeworks(prev =>
            prev.map(hw => hw.id === id ?
                { ...hw, newDate: newDate } : hw
            ));
    };


    const handleDelete = (id) => {
        props.setPublishedHomeworks(props.publishedHomeworks.filter(hw => hw.id !== id));
    };

    const formatForDatetimeLocal = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        if (isNaN(date)) return ''; // guard against invalid date
      
        const offset = date.getTimezoneOffset(); // local timezone adjustment in minutes
        const adjustedTime = date.getTime() - offset * 60 * 1000 - 2 * 60 * 60 * 1000; // minus 2 hours
        const localDate = new Date(adjustedTime);
      
        return localDate.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:mm'
      };

    return (
        <div className="container mt-4">
            {props.publishedHomeworks.map((hw) => (
                <div key={hw.id} className="card mb-3 shadow-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
                            <div className="btn-group align-items-center" role="group">
                                <button onClick={() => handleToggleTitle(hw.id)} className="btn btn-outline-primary btn-sm">
                                    Toggle Title
                                </button>
                                <button onClick={() => handleToggleDescription(hw.id)} className="btn btn-outline-primary btn-sm">
                                    Toggle Description
                                </button>
                                <button className="btn btn-outline-primary btn-sm" onClick={() => handleToggleSubject(hw.id)}>
                                    Toggle Subject
                                </button>
                                <button onClick={() => handleToggleDates(hw.id)} className="btn btn-outline-primary btn-sm">
                                    Toggle Dates
                                </button>
                                <button className="btn btn-success btn-sm" onClick={() => publishNewHomework(hw)}>
                                    Save Changes
                                </button>
                            </div>
                            <div className="btn-group mb-2" role="group">
                                {!hw.is_public && (
                                    <button onClick={() => handleDelete(hw.id)} className="btn btn-outline-danger btn-sm">
                                        ❌
                                    </button>
                                )}                                
                            </div>
                        </div>
                        {hw.showSubject && (
                            <div className="text-secondary mb-2">
                                {hw.name}
                            </div>
                        )}
                        {hw.showDates && (
                            <div className="mb-3">
                                <div className="form-group mb-2">
                                    <label className="form-label">Assignment Date:</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={formatForDatetimeLocal(hw.assignment_date)}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Due Date:</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        value={formatForDatetimeLocal(hw.newDate) || formatForDatetimeLocal(hw.due_date)}
                                        onChange={(e) => handleDueDateChange(hw.id, e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {hw.showTitle && (
                            <h5 className="card-title">{hw.title}</h5>
                        )}

                        {hw.showInput && (
                            <p className="card-text">{hw.description}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export { PublishedHomeworks };