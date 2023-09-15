import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(""); // State to store the input value

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update the state with input value
  };

  const handleSubscribe = () => {
    console.log("Input value:", inputValue); // Print the input value
    setInputValue("");

    const queryParams = {
      file: inputValue,
    };

    axios
      .get("http://localhost:3001/call", { params: queryParams })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Start Meeting
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="redDialogTitle">Make call</DialogTitle>
        <DialogContent>
          <DialogContentText>
            For further operations, please input the audio file name (as the
            demo version)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Audio file name"
            type="text" // Change the type to "text" to capture text input
            fullWidth
            variant="standard"
            value={inputValue} // Bind input value to state
            onChange={handleInputChange} // Handle input changes
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubscribe}>Submit</Button>{" "}
          {/* Call handleSubscribe */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
