import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export const CreatePoll = ({ onCreatePoll, open, handleClose }) => {
  const [choices, setChoice] = useState([]);
  const [question, setQuestion] = useState();
  const choiceTextFieldRef = useRef(null);
  const questionTextFieldRef = useRef(null);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create poll</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a poll enter question and add all the choices
          </DialogContentText>
          <TextField
            inputRef={questionTextFieldRef}
            autoFocus
            margin="dense"
            label="Question"
            type="text"
            fullWidth
            value={question || ""}
            onInput={() => setQuestion(questionTextFieldRef.current.value)}
          />
          <TextField
            inputRef={choiceTextFieldRef}
            margin="dense"
            label="Choice"
            type="text"
            fullWidth
          />
          <Button
            onClick={() => {
              setChoice([...choices, ...[choiceTextFieldRef.current.value]]);
            }}
            color="primary"
          >
            Add Choice
          </Button>

          {choices.map(choice => (
            <h3>{choice}</h3>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onCreatePoll({ question, choices });
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
