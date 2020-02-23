import React, { useState, useEffect } from "react";
import { PollPreviewList } from "../components/PollPreview/PollPreviewList";
import { PollDetails } from "../components/PollDetails/PollDetails";

const PAGE_HOME = "questions_list";
const PAGE_POLL = "poll";

export const ViewPolls = ({ PollService }) => {
  const [currentPage, setPage] = useState(PAGE_HOME);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [pollQuestions, setPollQuestions] = useState([]);

  useEffect(() => {
    async function fetchPollQuestions() {
      const pollQuestions = await PollService.fetchPollQuestions();
      setPollQuestions(pollQuestions);
    }
    fetchPollQuestions();
  }, [currentPage, PollService]);

  switch (currentPage) {
    case PAGE_POLL:
      return (
        <PollDetails
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
        <PollPreviewList
          questions={pollQuestions}
          onQuestionSelection={question => {
            setSelectedQuestion(question);
            setPage(PAGE_POLL);
          }}
        />
      );
  }
};
