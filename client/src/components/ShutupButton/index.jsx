import React from "react";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { ADD_REACTION } from "../../utils/mutations";
import Auth from "../../utils/auth";
import '../../pages/css/home.css'

const ShutupButton = ({ thoughtId }) => {
  const [addReaction] = useMutation(ADD_REACTION);

  const handleShutUpClick = async () => {
    if (!Auth.loggedIn()) {
      return;
    }

    try {
      const { data } = await addReaction({
        variables: {
          thoughtId: thoughtId,
          userId: Auth.getProfile().data._id,
        },
      });

      if (data && data.addReaction) {
        window.location.reload();
      }
    } catch (error) {
      alert("Already reacted to this thought");
    }
  };

  return (
    <div className="shutup-container">
      {Auth.loggedIn() ? (
        <button
          id={thoughtId}
          onClick={handleShutUpClick}
          className="shutup-button"
        >
          Shut Up!
        </button>
      ) : (
        <button
          className="shutup-button shutup-button-disabled"
          disabled
        >
          Shut Up!
        </button>
      )}
    </div>
  );
};

export default ShutupButton;

