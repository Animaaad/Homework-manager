import { useState, useEffect } from 'react';
//import { addMessage } from '../services/homeworkService'
import { HomeworkList } from '../components/HomeworkList'
import { getHomeworks } from '../services/homeworkService';
import { Link, useNavigate } from "react-router-dom";


function THome() {
  const [homeworks, setHomeworks] = useState([]);
  const [assignmentDate, setAssignmentDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  function publishNewMessage() {
    addMessage({
      "id": 0,
      "message_id": crypto.randomUUID(),
      "text": homeworks
    })
      .catch((error) => {
        console.log(error.message);
      })
  }

  const handleAddHomework = () => {
    const id = Date.now(); // Unique ID
    setHomeworks([...homeworks, { id, showInput: false, showDates: false, showTitle: false, title: '', text2: '', }]);
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
        ? { ...hw, text2: newText }
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
            <button className='Publish' onClick={publishNewMessage}>
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
          {hw.showInput && (
            <input
              id="message-text"
              type="text"
              value={hw.text2}
              onChange={(e) => handleInputChange(hw.id, e.target.value)}
              placeholder="Type something..."
              className="input"
            />
          )}
          {hw.showTitle && (
            <input
              id="message-text2"
              type="text"
              value={hw.title}
              onChange={(e) => handleTitleChange(hw.id, e.target.value)}
              placeholder="Type something..."
              className="input"
            />
          )}
        </div>

      ))}
    </div>
  );
}


function Home() {
  
  //const homeworks = ["a", "b"];
  const [homeworkss, setHomeworks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  let handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery("");
  }
  
  useEffect(() => {
    
    getHomeworks()
      .then((homeworks) => {
        console.log(homeworks)
        setHomeworks(homeworks);
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
      })}, []);
    //const fetchMessagesInterval = setInterval(fetchMessages, 100000);
    //return () => clearInterval(fetchMessagesInterval);
  
    
  
  return (
    <div className="hws">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for homeworks..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {homeworkss.map((hw) => (hw.text.toLowerCase().startsWith(searchQuery) && hw.text + " "))}
      
      {/*<HomeworkList homeworks={homeworkss}></HomeworkList>*/}
    </div>
  )
}

export { Home, THome };
