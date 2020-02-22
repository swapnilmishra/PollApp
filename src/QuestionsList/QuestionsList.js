import React from "react";
import { Question } from "./Question";
import Grid from "@material-ui/core/Grid";

export const QuestionsList = ({ questions, onQuestionSelection }) => {
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="flex-start"
    >
      {questions.map(question => (
        <div style={{ marginTop: 20 }}>
          <Question question={question} onSelection={onQuestionSelection} />
        </div>
      ))}
    </Grid>
  );
};
