// pages/onlineTest.jsx
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import Back from '../common/back/Back';
import './App.css';

const courses = {
  'HTML & CSS': [
    'What does CSS stand for?',
    'What is the purpose of the <div> tag?',
  ],
  JavaScript: ['What is a closure?', "Explain 'this' keyword."],
  Python: ['What is a list comprehension?', 'Explain the use of decorators.'],
  React: ['What is a component?', 'What are hooks in React?'],
  'Node.js': ['What is npm?', 'What is middleware in Express.js?'],
};

const correctAnswers = {
  'HTML & CSS': ['Cascading Style Sheets', 'Container for content'],
  JavaScript: ['A function within a function', 'Context reference'],
  Python: [
    'A concise way to create lists',
    'Functions that modify other functions',
  ],
  React: ['Reusable UI block', 'Functions to manage state'],
  'Node.js': [
    'Node Package Manager',
    'Functions executed during request handling',
  ],
};

function OnlineTest() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [answer, setAnswer] = useState('');
  const [warning, setWarning] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleQuestionSubmit = () => {
    // Check if the answer is correct
    if (
      answer.trim().toLowerCase() ===
      correctAnswers[selectedCourse][currentQuestionIndex].toLowerCase()
    ) {
      // Move to the next question or finish
      if (currentQuestionIndex + 1 < courses[selectedCourse].length) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setAnswer('');
        setWarning('Correct answer! Moving to the next question.');
      } else {
        setCompleted(true);
        setWarning('Congratulations! You have completed all questions.');
      }
    } else {
      // Incorrect answer handling
      setWarning('Incorrect answer, try another question.');
      setCurrentQuestionIndex(
        (prevIndex) => (prevIndex + 1) % courses[selectedCourse].length
      );
    }
  };

  return (
    <div className='App'>
      <Back title='Online Test' />

      {/* {!isAuthenticated ? (
        <button onClick={handleLogin}>Students Log in / Sign Up</button>
      ) : ( */}
      <>
        <div className='courses'>
          {Object.keys(courses).map((course, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedCourse(course);
                setCurrentQuestionIndex(0);
                setAnswer('');
                setWarning('');
                setCompleted(false); // Reset completion status
              }}
              className='course-div'
              style={{
                animation: `fadeIn ${index + 1}s`,
              }}
            >
              {course}
            </div>
          ))}
        </div>

        {selectedCourse && !completed && (
          <div className='question-section'>
            <h3>{courses[selectedCourse][currentQuestionIndex]}</h3>
            <div className='input'>
              <input
                type='text'
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <button onClick={handleQuestionSubmit}>Submit Answer</button>
            </div>
            {warning && <p>{warning}</p>}
          </div>
        )}

        {completed && (
          <div className='congratulations-section'>
            <h2>
              Congratulations! You have completed the {selectedCourse} test!
            </h2>
          </div>
        )}
      </>
      {/* )} */}
    </div>
  );
}

export default OnlineTest;
