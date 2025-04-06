import { useState } from 'react';

function Home() {
    const [homeworks, setHomeworks] = useState([]);

  const handleAddHomework = () => {
    const id = Date.now(); // Unique ID
    setHomeworks([...homeworks, { id, showInput: false, text: ''}]);
  };

  const handleToggleInput = (id) => {
    setHomeworks(homeworks.map(hw =>
      hw.id === id ? { ...hw, showInput: !hw.showInput } : hw
    ));
  };

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
              onClick={() => handleToggleInput(hw.id)}
              className="toggle-input"
            >
              Toggle Input
            </button>
            <button
              onClick={() => handleDelete(hw.id)}
              className="delete"
            >
              ❌
            </button>
            <button className='Publish'>
            Publish
            </button>
          </div>
          {hw.showInput && (
            <input
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

export default Home;