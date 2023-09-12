import React from "react";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { ADD_REACTION } from "../../utils/mutations"; 
import Auth from "../../utils/auth"; 



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
      alert("Already react in this thought");
    }
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <Button
          id={thoughtId}
          variant="outlined"
          color="inherit"
          size="small"
          onClick={handleShutUpClick}
        >
          Shut Up!
        </Button>
      ) : (
        <Button variant="disabled" color="inherit" size="small">
          Shut Up!
        </Button>
      )}
    </>
  );
};

export default ShutupButton;
