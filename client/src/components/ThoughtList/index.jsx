import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USERNAME_BY_ID } from '../../utils/queries';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts || thoughts.length === 0) {
    return <h3>No Thoughts Yet</h3>;
  }
  
  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts.map((thought) => (
        <div key={thought._id} className="card mb-3">
          <div className="card-body bg-light p-2">
            <p>{thought.thoughtText}</p>
            {showUsername && thought.user && (
              <UsernameDisplay userId={thought.user._id} />
            )}
          </div>
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

  return <p>This thought created by {data.user.username}</p>;
};

export default ThoughtList;
