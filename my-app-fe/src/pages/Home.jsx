import { useState, useEffect } from 'react';
import { getHomeworks, getStudentHomeworks, editNote, addStudentHomework, changeCompletion } from '../services/homeworkService';
import { useNavigate } from "react-router-dom";

function Home() {
  const [homeworks, setHomeworks] = useState([]);
  const [savedHomeworks, setSavedHomeworks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAvailableHomeworks, setShowAvailableHomeworks] = useState(false);
  const [showAddedHomeworks, setShowAddedHomeworks] = useState(false);
  const [showCompletedHomeworks, setShowCompletedHomeworks] = useState(false);
  const navigate = useNavigate();

  const addNewHomework = (hw) => {
    let a = savedHomeworks.some(item => item.hwid === hw.id);
    setHomeworks(homeworks.map(hw2 =>
      hw2.id === hw.id ? { ...hw2, is_added: true } : hw2
    ));
    if (!hw.is_added && !a) {
      addStudentHomework({
        id: crypto.randomUUID(),
        hwId: hw.id
      }).then().catch((error) => {
        console.log(error.message);
      });
    } else {
      alert("The homework is already saved");
    }
    getHomeworks()
      .then((homeworks1) => {
        setHomeworks(homeworks1.map(hw => hw.subject === null ? { ...hw, subject: '' } : hw));
      })
      .catch((error) => {
        console.log(error.message);
        setHomeworks([]);
        if (error.message === 'Not authenticated') {
          navigate("/");
        }
      });
    getStudentHomeworks()
      .then((homeworks1) => {
        setSavedHomeworks(homeworks1);
      })
      .catch((error) => {
        console.log(error.message);
        setSavedHomeworks([]);
        if (error.message === 'Not authenticated') {
          navigate("/");
        }
      });
  };

  useEffect(() => {
    getHomeworks()
      .then((homeworks1) => {
        setHomeworks(homeworks1.map(hw => hw.subject === null ? { ...hw, subject: '' } : hw));
      })
      .catch((error) => {
        console.log(error.message);
        setHomeworks([]);
        if (error.message === 'Not authenticated') {
          navigate("/");
        }
      });
  }, []);

  useEffect(() => {
    getStudentHomeworks()
      .then((homeworks1) => {
        setSavedHomeworks(homeworks1);
      })
      .catch((error) => {
        console.log(error.message);
        setSavedHomeworks([]);
        if (error.message === 'Not authenticated') {
          navigate("/");
        }
      });
  }, []);

  const handleNoteChange = (id, newText) => {
    setSavedHomeworks(savedHomeworks.map(hw =>
      hw.id === id ? { ...hw, note: newText } : hw
    ));
  };

  const handleToggleNote = (id) => {
    setSavedHomeworks(savedHomeworks.map(hw =>
      hw.id === id ? { ...hw, showNote: !hw.showNote } : hw
    ));
  };

  const handleSubmit = (hw) => {
    editNote({
      id: hw.id,
      note: hw.note
    }).catch((error) => {
      console.log(error.message);
    });
  };

  const handleCompletion = (hw) => {
    changeCompletion(hw.id, !hw.is_completed)
      .catch((error) => {
        console.log(error.message);
      });
      getStudentHomeworks()
      .then((homeworks1) => {
        setSavedHomeworks(homeworks1);
      })
      .catch((error) => {
        console.log(error.message);
        setSavedHomeworks([]);
        if (error.message === 'Not authenticated') {
          navigate("/");
        }
      });
  }

  const formatForDatetimeLocal = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    if (isNaN(date)) return ''; // guard against invalid date
    const offset = date.getTimezoneOffset(); // local timezone adjustment
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:mm'
  };

  return (
    <div className="container py-4">
      <h4 className="mb-3">Search & Add Homeworks</h4>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search for homeworks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button
        className="btn btn-sm btn-warning mb-4"
        onClick={() => setShowAvailableHomeworks(prev => !prev)}
      >
        {showAvailableHomeworks ? "Hide Homeworks" : "Show Homeworks"}
      </button>

      {showAvailableHomeworks && (
        <div className="mb-5">
          {homeworks
            .filter(hw =>
              hw.title.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
              hw.subject.toLowerCase().startsWith(searchQuery.toLowerCase())
            )
            .map((hw) => (
              <div key={hw.id} className="card mb-3 p-3">

                <div><strong>{hw.title}</strong></div>
                <div className="text-muted">{hw.description}</div>
                <div className="text-secondary mb-2">{hw.subject}</div>
                <div className="form-group mb-2">
                  <label className="form-label">Assignment Date:</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={formatForDatetimeLocal(hw.assignment_date)}
                    disabled
                  />
                  <label className="form-label">Due Date:</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={formatForDatetimeLocal(hw.due_date)}
                    disabled
                  />
                </div>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => addNewHomework(hw)}
                >
                  Save Homework
                </button>
              </div>
            ))}
        </div>
      )}

      <h4 className="mb-3">Added Homeworks</h4>
      <button
        className="btn btn-sm btn-warning mb-4"
        onClick={() => setShowAddedHomeworks(prev => !prev)}
      >
        {showAddedHomeworks ? "Hide Added Homeworks" : "Show Added Homeworks"}
      </button>
      {showAddedHomeworks &&
        (
          <div>
            {savedHomeworks.filter(hw => !hw.is_completed).map((hw) => (
              <div key={hw.id} className="card mb-3 p-3">
                <div><strong>{hw.title}</strong></div>
                <div className="text-muted">{hw.description}</div>
                <div className="text-secondary mb-2">{hw.subject}</div>
                <label className="form-label">Assignment Date:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={formatForDatetimeLocal(hw.assignment_date)}
                  disabled
                />
                <label className="form-label">Due Date:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={formatForDatetimeLocal(hw.due_date)}
                  disabled
                />
                <button
                  className="btn btn-sm btn-outline-secondary mb-2"
                  onClick={() => handleToggleNote(hw.id)}
                >
                  {hw.showNote ? 'Hide Note' : 'Add/Edit Note'}
                </button>

                {hw.showNote && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={hw.note ? hw.note : ''}
                      onChange={(e) => handleNoteChange(hw.id, e.target.value)}
                      placeholder="Note..."
                      className="form-control mb-2"
                    />
                    <button
                      onClick={() => handleSubmit(hw)}
                      className="btn btn-sm btn-primary"
                    >
                      Save Note
                    </button>
                  </div>
                )}
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleCompletion(hw)}
                >
                  Mark as completed
                </button>
              </div>
            ))}
          </div>
        )}
      <h4 className="mb-3">Completed Homeworks</h4>
      <button
        className="btn btn-sm btn-warning mb-4"
        onClick={() => setShowCompletedHomeworks(prev => !prev)}
      >
        {showCompletedHomeworks ? "Hide Completed Homeworks" : "Show Completed Homeworks"}
      </button>
      {showCompletedHomeworks &&
        (
          <div>
            {savedHomeworks.filter(hw => hw.is_completed).map((hw) => (
              <div key={hw.id} className="card mb-3 p-3">
                <div><strong>{hw.title}</strong></div>
                <div className="text-muted">{hw.description}</div>
                <div className="text-secondary mb-2">{hw.subject}</div>
                <label className="form-label">Assignment Date:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={formatForDatetimeLocal(hw.assignment_date)}
                  disabled
                />
                <label className="form-label">Due Date:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={formatForDatetimeLocal(hw.due_date)}
                  disabled
                />
                <button
                  className="btn btn-sm btn-outline-secondary mb-2"
                  onClick={() => handleToggleNote(hw.id)}
                >
                  {hw.showNote ? 'Hide Note' : 'Add/Edit Note'}
                </button>

                {hw.showNote && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={hw.note ? hw.note : ''}
                      onChange={(e) => handleNoteChange(hw.id, e.target.value)}
                      placeholder="Note..."
                      className="form-control mb-2"
                    />
                    <button
                      onClick={() => handleSubmit(hw)}
                      className="btn btn-sm btn-success"
                    >
                      Save Note
                    </button>
                  </div>
                )}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleCompletion(hw)}
                >
                  Return to the list of non-completed
                </button>
              </div>
            ))}
          </div>)}
    </div>
  );
}

export { Home };