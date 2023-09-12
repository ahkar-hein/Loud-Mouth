import { Navigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Auth from "../../utils/auth";
import { Box, TextField } from "@mui/material";
import ImageUpload from '../mediaUpload/mediaUpload';
import { UPDATE_USER } from "../../utils/mutations";

const UpdateForm = () => {

//   const [updateUser, { error }] = useMutation(UPDATE_USER);
//   const { username: userParam } = useParams();

//   const { loading, data } = useQuery(userParam ? QUERY_ME, {
//     variables: { username: userParam },
//   });

  const [newUsername, setUsername] = useState('');
  const [newPassword, setPassword] = useState('');
  const [newEmail, setEmail] = useState('');
  const [updateUser, { error, data }] = useMutation(UPDATE_USER)



  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try{
        const { data } = await updateUser({
            variables: {
                username: newUsername,
                email: newEmail,
                password: newPassword,
                imageSrc: 'dhfkjf',
                userId: Auth.getProfile().data._id
            },
        })
        setUsername('')
        setPassword('')
        setEmail('')
    }
    catch (error) {
        console.log(error);
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    if(name === 'email'){
        setEmail(value)
    }
    if(name === 'username'){
        setUsername(value)
    }
    if(name === 'password'){
        setPassword(value)
    }
  }
  const handleImageUpload = (imageUrl) => {
    setImage(imageUrl);
  };

  //const user = data.me;

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleFormSubmit}
    >
      <div>

        <TextField
          name="email"
          value={newEmail}
          onChange={handleChange}
          id="outlined-required"
          label="email"
          //defaultValue={user.email}
        />
      </div>
      <div>
        <TextField
        name="username"
        value={newUsername}
        onChange={handleChange}
          id="outlined-required"
          label="username"
          //defaultValue={user.username}
        />
      </div>
      <div>
        <TextField
            name="password"
            value={newPassword}
            onChange={handleChange} 
            id="outlined-required" 
            label="password" />
      </div>
      {/* <div>
      <ImageUpload onImageUpload={handleImageUpload} />
      </div> */}
      <div>
        <Button
            size="large"
            style={{ marginTop: "8px", height: "54px" }}
            variant="outlined"
            className="btn btn-block btn-primary"
            
            type="submit"
            >
            Submit
        </Button>
      </div>
    </Box>
  );
};
export default UpdateForm;
