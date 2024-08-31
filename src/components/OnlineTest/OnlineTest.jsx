
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import Back from '../common/back/Back';
import './App.css';

const courses = {
  "HTML & CSS": ["What does CSS stand for?", "What is the purpose of the <div> tag?"],
  "JavaScript": ["What is a closure?", "Explain 'this' keyword."],
  "Python": ["What is a list comprehension?", "Explain the use of decorators."],
  "React": ["What is a component?", "What are hooks in React?"],
  "Node.js": ["What is npm?", "What is middleware in Express.js?"],
  // Add more courses as needed
};

const correctAnswers = {
  "HTML & CSS": ["Cascading Style Sheets", "Container for content"],
  "JavaScript": ["A function within a function", "Context reference"],
  "Python": ["A concise way to create lists", "Functions that modify other functions"],
  "React": ["Reusable UI block", "Functions to manage state"],
  "Node.js": ["Node Package Manager", "Functions executed during request handling"],
  // Add corresponding answers
};

function App() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [answer, setAnswer] = useState('');
  const [warning, setWarning] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleQuestionSubmit = () => {
    if (answer.trim().toLowerCase() === correctAnswers[selectedCourse][currentQuestionIndex].toLowerCase()) {
      setWarning("Correct answer!");
    } else {
      setWarning("Incorrect answer, try another question.");
      setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % courses[selectedCourse].length);
    }
  };

  return (
    <div className="App">
      <Back title='Online Test' />

      {!isAuthenticated ? (
        <button onClick={handleLogin}>Students Log in / Sign Up</button>
      ) : (
        <>
          <div className="courses">
            {Object.keys(courses).map((course, index) => (
              <div 
                key={index} 
                onClick={() => { 
                  setSelectedCourse(course); 
                  setCurrentQuestionIndex(0); 
                  setAnswer('');
                  setWarning('');
                }}
                className="course-div"
                style={{
                  animation: `fadeIn ${index + 1}s`,
                }}
              >
                {course}
              </div>
            ))}
          </div>

          {selectedCourse && (
            <div className="question-section">
              <h3>{courses[selectedCourse][currentQuestionIndex]}</h3>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button onClick={handleQuestionSubmit}>Submit Answer</button>
              {warning && <p>{warning}</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;



























