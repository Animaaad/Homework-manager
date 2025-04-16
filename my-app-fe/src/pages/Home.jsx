import { useState, useEffect } from 'react';
//import { addMessage } from '../services/homeworkService'
import { HomeworkList } from '../components/HomeworkList'
import { getHomeworks } from '../services/homeworkService';

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
      })
  }, []);
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
      {homeworkss.map((hw) =>
        (hw.title.toLowerCase().startsWith(searchQuery) && hw.title + " " + hw.text))}

      {/*<HomeworkList homeworks={homeworkss}></HomeworkList>*/}
    </div>
  )
}

export { Home };
