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
    return <QuestionItem question={question} key={question.id} />
  });

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
