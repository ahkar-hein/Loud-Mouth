// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_THOUGHT, GET_USERNAME_BY_ID } from '../utils/queries';
//working 
const SingleThought = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
      {thought.user && thought.user._id && (
              <UsernameDisplay userId={thought.user._id} />
            )} <br />
        <span style={{ fontSize: '1rem' }}>
          had this thought on {thought.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          <img src={thought.media} alt="" />
          <br />
          {thought.thoughtText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={thought.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm thoughtId={thought._id} />
      </div>
    </div>
  );
};

const UsernameDisplay = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USERNAME_BY_ID, {
    variables: { userId },
  });

  if (loading) {
    return <p>Loading username...</p>;
  }

  if (error) {
    console.error(error);
    return <p>Error fetching username.</p>;
  }

  if (data.user && data.user.username) {
    return <p>{data.user.username}</p>;
  }
};
export default SingleThought;
