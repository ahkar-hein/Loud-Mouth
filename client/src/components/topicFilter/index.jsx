import React from 'react';

const TopicFilter = ({ topics, selectedTopic, onChange }) => {
  return (
    <div className='topicFilterContainer'>
      <h3>Filter by Topic</h3>
      <div className="topic-buttons">
        <button
          className={`topic-button ${selectedTopic === '' ? 'active' : ''}`}
          onClick={() => onChange('')}
        >
          All Topics
        </button>
        {topics.map((topic) => (
          <button
            key={topic._id}
            className={`topic-button ${selectedTopic === topic._id ? 'active' : ''}`}
            onClick={() => onChange(topic._id)}
          >
            {topic.topicBody}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicFilter;
