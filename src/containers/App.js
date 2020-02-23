import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { PollService } from "../services/PollService";
import { CreatePoll } from "../components/CreatePoll/CreatePoll";
import { ViewPolls } from "./PollHome";
import { useEffect } from "react";

const POLL_API_HOST = "https://polls.apiblueprint.org";

export default () => {
  const [isInCreateMode, setCreateMode] = useState(false);
  const [isPollServiceInit, setPollServiceInit] = useState(false);

  useEffect(() => {
    async function serviceInit() {
      await PollService.init(POLL_API_HOST);
      setPollServiceInit(true);
    }
    serviceInit();
  }, []);

  return (
    <>
      <Grid
        style={{ paddingLeft: 10, paddingRight: 10 }}
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <h1>Pollify App</h1>
        <Button variant="contained" onClick={() => setCreateMode(true)}>
          Create a poll
        </Button>
      </Grid>
      {isPollServiceInit &&
        (isInCreateMode ? (
          <CreatePoll
            open={true}
            onCreatePoll={({ question, choices }) => {
              PollService.createPoll({ question, choices });
              setCreateMode(false);
            }}
            handleClose={() => setCreateMode(false)}
          />
        ) : (
          <ViewPolls PollService={PollService} />
        ))}
    </>
  );
};
