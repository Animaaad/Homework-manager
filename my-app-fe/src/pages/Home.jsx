import { useState, useEffect } from 'react';
//import { addMessage } from '../services/homeworkService'
import { getHomeworks, getStudentHomeworks, editNote } from '../services/homeworkService';
import { addStudentHomework } from '../services/homeworkService'

function Home() {

  //const homeworks = ["a", "b"];
  const [homeworks, setHomeworks] = useState([]);
  const [savedHomeworks, setSavedHomeworks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  let addNewHomework = (hw) => {
    console.log(hw.id)
    setHomeworks(homeworks.map(hw2 =>
      hw2.id === hw.id ? { ...hw2, is_added: true } : hw2
    ));
    if (!hw.is_added) {
      addStudentHomework({
        "id": crypto.randomUUID(),
        "hwId": hw.id
      })
        .catch((error) => {
          console.log(error.message);
        })
    } else {
      console.log("already saved")
    }
  }

  useEffect(() => {
    getHomeworks()
      .then((homeworks1) => {
        console.log(homeworks1)
        setHomeworks(homeworks1);
        //props.setError('');
      })
      .catch((error) => {
        console.log(error.message);
        //props.setError(error.message);
        setHomeworks([]);
        if (error.message === 'Not authenticated') {
          //props.setAuthStatus(false);
          navigate("/");
        }
      })
  }, []);

  useEffect(() => {
    getStudentHomeworks()
      .then((homeworks1) => {
        console.log(homeworks1)
        setSavedHomeworks(homeworks1);
        //props.setError('');
      })
      .catch((error) => {
        console.log(error.message);
        //props.setError(error.message);
        setSavedHomeworks([]);
        if (error.message === 'Not authenticated') {
          //props.setAuthStatus(false);
          navigate("/");
        }
      })
  }, []);
  //const fetchMessagesInterval = setInterval(fetchMessages, 100000);
  //return () => clearInterval(fetchMessagesInterval);

  const handleNoteChange = (id, newText) => {
    setSavedHomeworks(savedHomeworks.map(hw =>
      hw.id === id
        ? { ...hw, note: newText }
        : hw
    ));
  };

  const handleToggleNote = (id) => {
    setSavedHomeworks(savedHomeworks.map(hw =>
      hw.id === id ? { ...hw, showNote: !hw.showNote } : hw
    ));
  };

  const handleSubmit = (hw) => {
    console.log(hw.id)
    editNote({
      "id" : hw.id,
      "note" : hw.note
    })
      .catch((error) => {
        console.log(error.message);
      })
  }


  return (
    <div className="hws">
      <input
        type="text"
        placeholder="Search for homeworks..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {homeworks.map((hw, index) =>
        hw.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
          <div key={index}>
            {hw.title} {hw.description}
            <button className='addhw' onClick={() => addNewHomework(hw)}>
              Save homework
            </button>
          </div>
        )
      )}
      Added homeworks:
      <div className='added'>
        {savedHomeworks.map((hw) => (
          <div key={hw.id}>
            {hw.title} {hw.description}
            <button
              onClick={() => handleToggleNote(hw.id)}
              className="toggle-note"
            >
              Toggle Note
            </button>
            {hw.showNote && (
              <div>
                <input
                  id="message-text"
                  type="text"
                  value={hw.note}
                  onChange={(e) => handleNoteChange(hw.id, e.target.value)}
                  placeholder="Note:..."
                  className="input"
                />
                <button
                  onClick={() => handleSubmit(hw)}
                  className="toggle-note"
                >
                  Save note
                </button>
              </div>
            )
            }
          </div>
        ))}
      </div>
      {/*<HomeworkList homeworks={homeworkss}></HomeworkList>*/}
    </div>
  )
}

export { Home };
