import React from "react";
import "./App.css";
import data from "./data";
import { QuestionsList } from "./QuestionsList/QuestionsList";

function App() {
  return (
    <div className="App-header">
      <QuestionsList questions={data} />
    </div>
  );
}

export default App;
