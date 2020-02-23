import React, { useState } from "react";
import "./App.css";
import data from "./data";
import { QuestionsList } from "./QuestionsList/QuestionsList";
import { Poll } from "./Poll/Poll";

const PAGE_HOME = "questions_list";
const PAGE_POLL = "poll";

function App() {
  const [currentPage, setPage] = useState(PAGE_HOME);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  switch (currentPage) {
    case PAGE_POLL:
      return (
        <div className="App-header">
          <Poll
            question={selectedQuestion}
            onVote={selectedChoice => console.log(selectedChoice)}
          />
        </div>
      );
    default:
      return (
        <div className="App-header">
          <QuestionsList
            questions={data}
            onQuestionSelection={question => {
              setSelectedQuestion(question);
              setPage(PAGE_POLL);
            }}
          />
        </div>
      );
  }
}

export default App;
