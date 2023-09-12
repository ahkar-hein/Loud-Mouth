import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME, QUERY_TOPICS } from '../../utils/queries';

import ImageUpload from '../mediaUpload/mediaUpload';
import Auth from '../../utils/auth';
import '../../pages/css/home.css'

const ThoughtForm = () => {
  const [thoughtText, setThoughtText] = useState('');
  const [topicId, setTopicId] = useState('');
  const [image, setImage] = useState(null);
  const [characterCount, setCharacterCount] = useState(0);
  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    refetchQueries: [QUERY_THOUGHTS, QUERY_ME],
  });

  const { loading, data } = useQuery(QUERY_TOPICS);

  useEffect(() => {
    if (data) {
      if (data.topics.length > 0) {
        setTopicId(data.topics[0]._id);
      }
    }
  }, [data]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addThought({
        variables: {
          thoughtText,
          media: image,
          userId: Auth.getProfile().data._id,
          topicId,
        },
      });

      setThoughtText('');
      setImage(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    } else if (name === 'topicId') {
      setTopicId(value);
    }
  };
  const handleImageUpload = (imageUrl) => {
    setImage(imageUrl);
  };
  return (
    <div id='thought-form'>
      {Auth.loggedIn() ? (
        <>
          <p id="char-count"
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div id='thought-input' className="col-12 col-lg-9">
              <textarea
                name="thoughtText"
                placeholder="Here's a new thought..."
                value={thoughtText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
              <select
                name="topicId"
                value={topicId}
                onChange={handleChange}
                className="form-input w-100"
                required
              >
                <option value="">Choose Topic</option>
                {loading ? (
                  <option>Loading topics...</option>
                ) : (
                  data.topics.map((topic) => (
                    <option key={topic._id} value={topic._id}>
                      {topic.topicBody}
                    </option>
                  ))
                )}
              </select>
              <ImageUpload onImageUpload={handleImageUpload} />
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Thought
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ThoughtForm;
