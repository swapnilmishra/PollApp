import React from "react";
import { PollPreviewCard } from "./PollPreviewCard";
import Grid from "@material-ui/core/Grid";

export const PollPreviewList = ({ questions, onQuestionSelection }) => {
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="flex-start"
    >
      {questions.map(question => (
        <div style={{ marginTop: 20 }}>
          <PollPreviewCard
            question={question}
            onSelection={onQuestionSelection}
          />
        </div>
      ))}
    </Grid>
  );
};
