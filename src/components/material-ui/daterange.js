import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));
export default function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState();
  const classes = useStyles();
  console.log(dates);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.filterPosts(dates.start, dates.end);
    setOpen(false);
  };

  const handleChange = e => {
    setDates({
      ...dates,
      [e.target.name]: e.target.value
    });
  };

  const disable = () => {
    if (dates && dates.start && dates.end) {
      return (
        <Button onClick={handleClose} color="primary" >
          Search
        </Button>
      );
    } else {
      return (
        <Button onClick={handleClose} color="primary" disabled>
          Search
        </Button>
      );
    }
  };
  return (
    <div>
      <Button
        variant="contained"
        className="filterButtons"
        color="primary"
        style={{ height: "100%" }}
        onClick={handleClickOpen}
      >
        Date Range
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <form className={classes.container} noValidate>
            <TextField
              id="date"
              label="Start Date"
              type="date"
              onChange={handleChange}
              name="start"
              // defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="date"
              label="End Date"
              type="date"
              name="end"
              onChange={handleChange}
              // defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {disable()}
        </DialogActions>
      </Dialog>
    </div>
  );
}
