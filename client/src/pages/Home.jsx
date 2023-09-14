import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';

// import TopicList from '../components/TopicList';
import './css/home.css';
// import TopicList from '../components/TopicList';

const Home = () => {
  const { loading, data, error } = useQuery(QUERY_THOUGHTS);
  if (error) {
    console.log(error)
  }
  const thoughts = data?.thoughts || [];
  const users = data?.users || [];
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleTopicChange = (topicId) => {
    setSelectedTopic(topicId);
  };

  if (!loading) {
    console.log(data)
  }

  return (
    <main>
      <div id='main-container' className="flex-row justify-center">
        <div id='thoughts-container'
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ThoughtForm />
          {/* <TopicList /> */}
        </div>
        <div id='thoughts' className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              users={users}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
