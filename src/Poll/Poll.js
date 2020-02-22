import React from "react";
import Typography from "@material-ui/core/Typography";

const calculateTotalVotes = choices => {
  let totalVotes = 0;
  choices.forEach(choice => {
    totalVotes += choice.votes;
  });
  return totalVotes;
};

export const Poll = ({ question }) => {
  const { question: questionName, choices } = question;
  const totalVotes = calculateTotalVotes(choices);

  return (
    <>
      <Typography gutterBottom variant="h5" component="h1">
        {questionName}
      </Typography>

      {choices.map(choice => {
        const { choice: choiceName, votes } = choice;
        return (
          <div>
            <span>choice: {choiceName}</span>
            <span>votes count: {votes}</span>
            <span>votes percentage: {(votes / totalVotes) * 100} %</span>
          </div>
        );
      })}
    </>
  );
};
