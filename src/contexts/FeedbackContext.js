import { nanoid } from "nanoid";
import React from "react";
import { createContext, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    { id: 1, text: "this is a test from context", rating: 10 },
    { id: 2, text: "this is daf test from context", rating: 5 },
    { id: 3, text: "this is asdasfsf test from context", rating: 8 },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // update feedback
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  // add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = nanoid();
    setFeedback([newFeedback, ...feedback]);
  };

  //Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm("are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
