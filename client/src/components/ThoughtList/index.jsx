import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USERNAME_BY_ID, QUERY_TOPICS } from '../../utils/queries';
import ShutupButton from '../ShutupButton';
import TopicFilter from '../topicFilter';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const { loading: topicsLoading, data: topicsData } = useQuery(QUERY_TOPICS);

  const filteredThoughts = selectedTopic
  ? thoughts.filter((thought) =>
      thought.topics.some((topic) => topic._id === selectedTopic)
    )
  : thoughts;

  const handleTopicChange = (topicId) => {
    setSelectedTopic(topicId);
  };

  return (
    <div>
      {showTitle && <h3>{title}</h3>}

      {/* Render the TopicFilter component */}
      {!topicsLoading && (
        <TopicFilter
          topics={topicsData.topics}
          selectedTopic={selectedTopic}
          onChange={handleTopicChange}
        />
      )}
       {selectedTopic && (
      <p>{topicsData.topics.find(topic => topic._id === selectedTopic)?.topicBody}</p>
  )}
      {filteredThoughts.map((thought) => (
        <div key={thought._id} className="card mb-3">
          <div className="card-body bg-light p-2">
            <img src={thought.media} alt="" />
            <p>{thought.thoughtText}</p>
            {showUsername && thought.user && thought.user._id && (
              <UsernameDisplay username={thought.user.username} />
            )}
          </div>
          <ShutupButton thoughtId={thought._id} /> <br />
          <p>This thought reacted {thought.reactionCount} users.</p>
          <Link
            className="btn btn-primary btn-block btn-squared"
            to={`/thoughts/${thought._id}`}
          >
            Join the discussion on this thought.
          </Link>
        </div>
      ))}
    </div>
  );
};

const UsernameDisplay = ({ username }) => {
  if (username) {
    return <p>This thought created by {username}</p>;
  }
};

export default ThoughtList;
