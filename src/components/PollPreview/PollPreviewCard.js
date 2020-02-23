import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 345
  }
});

export const PollPreviewCard = ({ question, onSelection }) => {
  const { question: name, published_at: publishedAt, choices } = question;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Published at {new Date(publishedAt).toDateString()}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {choices.length} choices
        </Typography>
      </CardContent>
      <CardActions>
        <Grid
          style={{ paddingLeft: 10, paddingRight: 10 }}
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Button
            size="small"
            color="primary"
            onClick={() => onSelection(question)}
          >
            Vote
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};
