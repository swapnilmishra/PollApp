import React, { useState, useEffect } from "react";
import "./App.css";
import { QuestionsList } from "./components/QuestionsList/QuestionsList";
import { Poll } from "./components/Poll/Poll";
import { PollService } from "./services/PollService";
import { CreatePoll } from "./components/CreatePoll/CreatePoll";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const PAGE_HOME = "questions_list";
const PAGE_POLL = "poll";
const POLL_API_HOST = "https://polls.apiblueprint.org";

const ViewPolls = () => {
  const [currentPage, setPage] = useState(PAGE_HOME);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [pollQuestions, setPollQuestions] = useState([]);

  useEffect(() => {
    async function fetchPollQuestions() {
      await PollService.init(POLL_API_HOST);
      const pollQuestions = await PollService.fetchPollQuestions();
      setPollQuestions(pollQuestions);
    }
    fetchPollQuestions();
  }, [currentPage]);

  switch (currentPage) {
    case PAGE_POLL:
      return (
        <Poll
          question={selectedQuestion}
          onVote={async selectedChoice => {
            await PollService.postSelectedPollChoice(selectedChoice);
            setPage(PAGE_HOME);
          }}
          onBack={() => setPage(PAGE_HOME)}
        />
      );

    default:
      return (
        <QuestionsList
          questions={pollQuestions}
          onQuestionSelection={question => {
            setSelectedQuestion(question);
            setPage(PAGE_POLL);
          }}
        />
      );
  }
};

export default () => {
  const [isInCreateMode, setCreateMode] = useState(false);
  return (
    <>
      <Grid
        style={{ paddingLeft: 20, paddingRight: 20 }}
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
        />
      ) : (
        <ViewPolls />
      )}
    </>
  );
};
