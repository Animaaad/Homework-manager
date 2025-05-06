import { useState } from 'react';
import { addSubject } from '../services/homeworkService';

function Subjects() {
    const [subjects, setSubjects] = useState([]);

    const handleAddSubject = () => {
        const id = crypto.randomUUID();
        setSubjects([...subjects, { id, code: '', name: '', showCode: false, showName: false }]);
    };

    const saveSubject = (sj) => {
        if (sj.code && sj.name) {
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
            });
        }
    };

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
            sj.id === id ? { ...sj, name: newText } : sj
        ));
    };

    const handleCodeChange = (id, newText) => {
        setSubjects(subjects.map(sj =>
            sj.id === id ? { ...sj, code: newText } : sj
        ));
    };

    return (
        <div className="subjects-container">
            <button
                onClick={handleAddSubject}
                className="add-subject btn btn-success"
            >
                Add Subject
            </button>

            {subjects.map((sj) => (
                <div key={sj.id} className="subject-card p-4 mb-4 rounded shadow-sm">
                    <div className="d-flex justify-content-between">
                        <div>
                            <button
                                onClick={() => handleToggleName(sj.id)}
                                className="btn btn-outline-info btn-sm me-2"
                            >
                                Toggle Name
                            </button>
                            <button
                                onClick={() => handleToggleCode(sj.id)}
                                className="btn btn-outline-info btn-sm me-2"
                            >
                                Toggle Code
                            </button>
                        </div>
                        <button
                            onClick={() => handleDelete(sj.id)}
                            className="btn btn-danger btn-sm"
                        >
                            ❌
                        </button>
                    </div>

                    {sj.showName && (
                        <input
                            type="text"
                            value={sj.name}
                            onChange={(e) => handleNameChange(sj.id, e.target.value)}
                            placeholder="Enter Subject Name"
                            className="form-control my-2"
                        />
                    )}

                    {sj.showCode && (
                        <input
                            type="text"
                            value={sj.code}
                            onChange={(e) => handleCodeChange(sj.id, e.target.value)}
                            placeholder="Enter Subject Code"
                            className="form-control my-2"
                        />
                    )}

                    <button
                        className="btn btn-primary mt-3 w-100"
                        onClick={() => saveSubject(sj)}
                    >
                        Save the Subject
                    </button>
                </div>
            ))}
        </div>
    );
}

export { Subjects };