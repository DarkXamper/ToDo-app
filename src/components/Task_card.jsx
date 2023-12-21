import {
  CheckSharp,
  ClearOutlined,
  DeleteOutline,
  EditOutlined,
  SaveAsOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  Fab,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import "./Task_container.css";

const Task_card = ({ text, onDelete, onEdit }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isCompleted, setIsCompleted] = useState(false); //State to track the task completion
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleCompleteTask = () => {
    setIsCompleted(!isCompleted); //Toggle the completion state
  };

  const handleEditClick = () => {
    setIsEditing(true); //Toggle the editing button state
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onEdit(text, editedText); //used to save the task
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedText(editedText); //used to cancel the process of editing task
  };

  const handleKeyDownSave = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      onEdit(text, editedText);
    }
  };

  return (
    <>
      <Card
        className="task_container"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.6em 1.2em",
          alignItems: "center",
          width: isSmallScreen ? "inherit" : "70%",
          height: "auto",
          background: "rgba(255,255,255,0.6)",
          borderRadius: "8px",
          textOverflow: "hidden",
          flexDirection: isSmallScreen ? "column" : "row",
          gap: isSmallScreen ? "1rem" : "",
          // border: "1px solid rgba(255,255,100,0.6)",
          // boxShadow: "1px 2px 1px black",
        }}
      >
        <Box
          className="task"
          sx={{
            fontSize: isSmallScreen ? "x-large" : "large",
            textDecoration: isCompleted ? "line-through" : "none",
            width: "100%",
          }}
        >
          {isEditing ? (
            <TextField
              // sx={{ width: "100%" }}
              fullWidth
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={handleKeyDownSave}
            />
          ) : (
            editedText
          )}
          {/* {text} */}
        </Box>
        <Box
          className="task_icons"
          sx={{
            display: "flex",
            gap: "1em",
            // fontSize: isSmallScreen ? "small" : "",
          }}
        >
          <Fab
            sx={{
              background: "none",
              boxShadow: "none",
              cursor: "pointer",
              // fontSize: isSmallScreen ? "x-small" : "",
            }}
            size={isSmallScreen ? "small" : ""}
            onClick={handleCompleteTask}
          >
            <CheckSharp fontSize={isSmallScreen ? "small" : "small"} />
          </Fab>

          <Fab
            sx={{ background: "none", boxShadow: "none", cursor: "pointer" }}
            size={isSmallScreen ? "small" : ""}
            onClick={() => {
              onDelete(text);
            }}
          >
            <DeleteOutline fontSize={isSmallScreen ? "small" : "small"} />
          </Fab>

          {isEditing ? (
            <>
              <Box
                className="insideEdit"
                sx={{
                  background: "rgba(255,255,255,1)",
                  Opacity: "0.9",
                  borderRadius: "0.5rem",
                  display: "flex",
                  padding: "2px 4px",
                }}
              >
                <Fab
                  sx={{
                    background: "none",
                    boxShadow: "none",
                    cursor: "pointer",
                  }}
                  size={isSmallScreen ? "small" : ""}
                  onClick={handleSaveClick}
                >
                  <SaveAsOutlined
                    fontSize={isSmallScreen ? "small" : "small"}
                  />
                </Fab>
                <Fab
                  sx={{
                    background: "none",
                    boxShadow: "none",
                    cursor: "pointer",
                  }}
                  size={isSmallScreen ? "small" : ""}
                  onClick={handleCancelClick}
                >
                  <ClearOutlined fontSize={isSmallScreen ? "small" : "small"} />
                </Fab>
              </Box>
            </>
          ) : (
            <Fab
              className="editfab"
              sx={{ background: "none", boxShadow: "none", cursor: "pointer" }}
              size={isSmallScreen ? "small" : ""}
              onClick={handleEditClick}
            >
              <EditOutlined fontSize={isSmallScreen ? "small" : "small"} />
            </Fab>
          )}
        </Box>
      </Card>
    </>
  );
};

export default Task_card;
