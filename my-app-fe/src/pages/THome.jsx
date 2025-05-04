import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { addHomework, getHomeworks, updateHomework } from '../services/homeworkService'
import { Homeworks } from '../components/Homeworks';
import { SavedHomeworks } from '../components/SavedHomeworks';
import { PublishedHomeworks } from '../components/PublishedHomeworks';
function THome(props) {
    const [homeworks, setHomeworks] = useState([]);
    const navigate = useNavigate();



    const [displayedHomeworks, setDisplayedHomeworks] = useState([]);
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
        <div className="add-homeworks">
            <Homeworks></Homeworks>

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
                Drafts:
                <SavedHomeworks></SavedHomeworks>
                {displayedHomeworks.map((hw) =>
                    hw.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                        <div key={hw.id}>
                            {hw.title} {hw.description} {hw.assignment_date} {hw.due_date}
                        </div>
                    )
                )}
                Published homeworks:
                <PublishedHomeworks></PublishedHomeworks>
            </div>
        </div>
    );
}

export { THome }
