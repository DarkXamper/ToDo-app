import { useState } from "react";
import "./App.css";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import Task_card from "./components/Task_card";

function App() {
  const [inputValue, setInputValue] = useState(""); // State to hold the input value
  const [taskCards, setTaskCards] = useState([]); // State to store the task cards
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const handleAddCard = () => {
    if (inputValue) {
      setTaskCards([...taskCards, inputValue]); // Add the input value to task card state
      setInputValue(""); // Clear the input field
    }
    // alert(inputValue); // Use the input value from the state
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update the input value in the state
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddCard();
    }
  };
  const handleDelete = (task) => {
    const updatedTaskcards = taskCards.filter((t) => t !== task);
    setTaskCards(updatedTaskcards);
  };
  const handleEdit = (oldText, newText) => {
    const updatedTaskcards = taskCards.map((task) =>
      task === oldText ? newText : task
    );
    setTaskCards(updatedTaskcards);
  };

  return (
    <>
      <Box className="main">
        <Box className="glass" sx={{ width: isSmallScreen ? "100%" : "60%" }}>
          {/* <Typography variant='h1' sx={{ fontSize: "3.2em", lineHeight: "1.1" }}>ToDo App</Typography> */}
          <h1 style={{ fontSize: isSmallScreen ? "2.4em" : "3.2em" }}>
            ToDo App
          </h1>
          <Box
            className="input_container"
            sx={{
              display: "flex",
              flexDirection: "row",
              width: isSmallScreen ? "100%" : "80%",
            }}
          >
            <TextField
              className="inp"
              fullWidth
              // sx={{ width: "80%" }}
              type="text"
              name=""
              id=""
              placeholder="Enter the task"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <Button
              variant="text"
              className="btn"
              sx={{
                width: "20%",
                border: "none",
                textTransform: "none",
                fontSize: isSmallScreen ? "small" : "1em",
                boxShadow: "none",
                // fontWeight: "bold",
                fontFamily:
                  "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
              }}
              onClick={handleAddCard}
            >
              Add Task
            </Button>
          </Box>
          {taskCards.map((task) => (
            <Task_card
              key={task}
              text={task}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </Box>
      </Box>
      <Box className="circle1"></Box>
      <Box className="circle2"></Box>
    </>
  );
}

export default App;
