import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { addSubject } from '../services/homeworkService'




function Subjects() {

    const [subjects, setSubjects] = useState([]);

    const handleAddSubject = () => {
        const id = crypto.randomUUID();
        setSubjects([...subjects, { id, code: '', name: '', showCode: false, showName: false }]);
    };

    function saveSubject(sj) {
        console.log(sj)
        /*setSubjects(subjects.map(hw2 =>
            hw2.id === sj.id ? { ...hw2, is_saved: true } : hw2
        ));*/
        if (sj.code && sj.name) {
            console.log("adding")
            addSubject({
                "name": sj.name,
                "code": sj.code
            }).catch((error) => {
                if (error.response?.status === 409) {
                    alert("This code already exists");
                } else {
                    alert("Something went wrong.");
                    console.error(error.message);
                }
            })
        }
    }

        const handleToggleName = (id) => {
            setSubjects(subjects.map(sj =>
                sj.id === id ? { ...sj, showName: !sj.showName } : sj
            ));
        };

        const handleToggleCode = (id) => {
            setSubjects(subjects.map(sj =>
                sj.id === id ? { ...sj, showCode: !sj.showCode } : sj
            ));
        };

        const handleDelete = (id) => {
            setSubjects(subjects.filter(sj => sj.id !== id));
        };

        const handleNameChange = (id, newText) => {
            setSubjects(subjects.map(sj =>
                sj.id === id
                    ? { ...sj, name: newText }
                    : sj
            ));
        };

        const handleCodeChange = (id, newText) => {
            setSubjects(subjects.map(sj =>
                sj.id === id
                    ? { ...sj, code: newText }
                    : sj
            ));
        };


        return (
            <div>
                <button
                    onClick={handleAddSubject}
                    className="add-subject"
                >
                    Add Subject
                </button>
                {subjects.map((sj) => (
                    <div key={sj.code} className="add-sjs">
                        <div>
                            <button
                                onClick={() => handleToggleName(sj.id)}
                                className="toggle-name"
                            >
                                Toggle Name
                            </button>
                            <button
                                onClick={() => handleToggleCode(sj.id)}
                                className="toggle-code"
                            >
                                Toggle Code
                            </button>
                            <button
                                onClick={() => handleDelete(sj.id)}
                                className="delete"
                            >
                                ❌
                            </button>
                        </div>
                        {sj.showName && (
                            <input
                                id="message-text"
                                type="text"
                                value={sj.name}
                                onChange={(e) => handleNameChange(sj.id, e.target.value)}
                                placeholder="Title:..."
                                className="input"
                            />
                        )}

                        {sj.showCode && (
                            <input
                                id="message-text"
                                type="text"
                                value={sj.code}
                                onChange={(e) => handleCodeChange(sj.id, e.target.value)}
                                placeholder="Type something..."
                                className="input"
                            />
                        )}
                        <div>
                            <button className='Publish' onClick={() => saveSubject(sj)}>
                                Save the subject
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    export { Subjects }