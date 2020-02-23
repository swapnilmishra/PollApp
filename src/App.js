import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import { PollService } from "./services/PollService";
import { CreatePoll } from "./components/CreatePoll/CreatePoll";
import { ViewPolls } from "./containers/PollHome";

export default () => {
  const [isInCreateMode, setCreateMode] = useState(false);
  return (
    <>
      <Grid
        style={{ paddingLeft: 10, paddingRight: 10 }}
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <h1>Quizzify App</h1>
        <Button variant="contained" onClick={() => setCreateMode(true)}>
          Create a poll
        </Button>
      </Grid>
      {isInCreateMode ? (
        <CreatePoll
          open={true}
          onCreatePoll={({ question, choices }) => {
            PollService.createPoll({ question, choices });
            setCreateMode(false);
          }}
          handleClose={() => setCreateMode(false)}
        />
      ) : (
        <ViewPolls />
      )}
    </>
  );
};
