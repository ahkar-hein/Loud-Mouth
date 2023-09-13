import { useQuery } from '@apollo/client';
import { GET_USERNAME_BY_ID } from '../../utils/queries';

const CommentList = ({ comments = [], userId }) => {
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Comments
      </h3>
      <div className="flex-row my-4">
        {comments.map((comment) => (
          <div key={comment._id} className="col-12 mb-3 pb-3">
            <div className="p-3 bg-dark text-light">
              <h5 className="card-header">
                Commented
                <span style={{ fontSize: '0.825rem' }}>
                  {' '}
                  on {comment.createdAt} by{' '}
                  <UsernameDisplay userId={userId} />
                </span>
              </h5>
              <p className="card-body">{comment.commentText}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const UsernameDisplay = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USERNAME_BY_ID, {
    variables: { userId: userId },
  });

  if (loading) {
    return <p>Loading username...</p>;
  }

  if (error) {
    console.error(error);
    return <p>Error fetching username.</p>;
  }

  return <span>{data.userComment.userId.username}</span>;
};

export default CommentList;
