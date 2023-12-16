import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // get questions from server
  useEffect(() => {
    // use fetch to retrieve data
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questionData) => setQuestions(questionData));
  }, []);

  const questionItems = questions.map((question) => {
    return <QuestionItem question={question} key={question.id} onDeleteQuestion={handleDelete} onAnswerChange={handleAnswerChange}/>
  });

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        const updatedQuestions = questions.filter((question) => question.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  function handleAnswerChange(id, index) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({index}),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestion.id) {
            return updatedQuestion;
          }
          else {
            return q;
          }
        });
        setQuestions(updatedQuestions);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */ }
        {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;
