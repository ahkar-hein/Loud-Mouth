import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: ''
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" }}}
                onSubmit={handleFormSubmit}>
                <TextField
                  className="form-input"
                  required
                  id="outlined-required"
                  placeholder="First name"
                  name="firstname"
                  type="text"
                  value={formState.firstname}
                  onChange={handleChange}
                />
                <TextField
                  className="form-input"
                  required
                  id="outlined-required"
                  placeholder="Last name"
                  name="lastname"
                  type="text"
                  value={formState.lastname}
                  onChange={handleChange}
                />
                <TextField
                  className="form-input"
                  required
                  id="outlined-required"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                <TextField
                  className="form-input"
                  required
                  id="outlined-required"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <TextField
                  className="form-input"
                  required
                  id="outlined-required"
                  placeholder="Your password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <Button
                    size="large"
                    style={{ marginTop: "8px", height: "54px" }}
                    variant="outlined"
                    className="btn btn-block btn-primary"
                    onClick={handleFormSubmit}
                    type="submit"
                  >
                    Submit
                  </Button>
              </Box>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
