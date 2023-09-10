import Auth from "../../utils/auth";
import * as React from "react";
import Button from "@mui/material/Button";

const ShutupButton = () => {
  return (
    <>
      {Auth.loggedIn() ? (
        <Button variant="outlined" color="inherit" size="small">
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
