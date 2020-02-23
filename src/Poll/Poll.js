import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { FormControlLabel, CircularProgress } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Radio from "@material-ui/core/Radio";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const calculateTotalVotes = choices => {
  let totalVotes = 0;
  choices.forEach(choice => {
    totalVotes += choice.votes;
  });
  return totalVotes;
};

const calculateVotePercent = (vote, totalVotes) => {
  const percentage = (vote / totalVotes) * 100;
  if (isNaN(percentage)) {
    return 0;
  }
  return percentage;
};

export const Poll = ({ question, onVote }) => {
  const classes = useStyles();
  const { question: questionName, choices } = question;
  const totalVotes = calculateTotalVotes(choices);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h1">
          {questionName}
        </Typography>
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              {choices.map(choice => {
                const choiceName = choice.choice;
                return (
                  <TableRow key={choiceName}>
                    <TableCell component="th" scope="row">
                      <FormControlLabel
                        value={choiceName}
                        control={
                          <Radio
                            checked={selectedValue === choiceName}
                            onChange={() => {
                              setSelectedValue(choiceName);
                              setSelectedChoice(choice);
                            }}
                            value={choiceName}
                            name="radio-button-choice"
                            inputProps={{ "aria-label": choiceName }}
                          />
                        }
                        label={choiceName}
                        labelPlacement="end"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">
                        {choice.votes} votes
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">
                        {calculateVotePercent(choice.votes, totalVotes)}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <div className={classes.root}>
                        <CircularProgress
                          variant="static"
                          value={calculateVotePercent(choice.votes, totalVotes)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onVote(selectedChoice)}
        >
          Save vote
        </Button>
      </CardActions>
    </Card>
  );
};
