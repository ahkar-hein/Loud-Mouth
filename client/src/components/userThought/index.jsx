import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import { UPDATE_THOUGHT, DELETE_THOUGHT } from '../../utils/mutations';

const UserThoughts = ({ username }) => {
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { username },
  });

  const [updateThought] = useMutation(UPDATE_THOUGHT);
  const [deleteThought] = useMutation(DELETE_THOUGHT);

  const [updatedThoughtText, setUpdatedThoughtText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (data && data.user && data.user.thoughts.length > 0) {
      setUpdatedThoughtText(data.user.thoughts[0].thoughtText);
    }
  }, [data]);

  if (loading) {
    return <p>Loading user's thoughts...</p>;
  }

  if (error) {
    console.error(error);
    return <p>Error fetching user's thoughts.</p>;
  }

  const user = data.user;

  const handleUpdateThought = (thoughtId) => {
    updateThought({
      variables: { thoughtId, thoughtText: updatedThoughtText },
    })
      .then((result) => {
        console.log('Thought updated:', result);
      })
      .catch((error) => {
        console.error('Error updating thought:', error);
      });

    setIsEditing(false); 
  };

  const handleDeleteThought = (thoughtId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this thought?');

    if (confirmDelete) {
      deleteThought({
        variables: { thoughtId },
      })
        .then((result) => {
          console.log('Thought deleted:', result);
          window.location.reload()
        })
        .catch((error) => {
          console.error('Error deleting thought:', error);
        });
    }
  };

  return (
    <div>gi
      {user.thoughts.map((thought) => (
        <div key={thought._id} className="card mb-3">
          <div className="card-body bg-light p-2">
            <img src={thought.media} alt="" />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              defaultValue={thought.thoughtText} 
              value={updatedThoughtText}
              disabled={!isEditing}
              onChange={(e) => setUpdatedThoughtText(e.target.value)}
            />
          </div>
          {isEditing ? (
            <button onClick={() => handleUpdateThought(thought._id)}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Update</button>
          )}
          <button onClick={() => handleDeleteThought(thought._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserThoughts;
