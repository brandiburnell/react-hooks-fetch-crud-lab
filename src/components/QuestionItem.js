import React from "react";

function QuestionItem({ question, onDeleteQuestion, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick() {
    onDeleteQuestion(id);
  }
  
  function handleAnswerChange(e) {
    onAnswerChange(id, Number(e.target.value));
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
