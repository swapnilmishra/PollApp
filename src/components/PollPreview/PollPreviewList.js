import React from "react";
import { PollPreview } from "./PollPreview";
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
          <PollPreview question={question} onSelection={onQuestionSelection} />
        </div>
      ))}
    </Grid>
  );
};
