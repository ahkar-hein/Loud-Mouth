import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      firstname
      lastname
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
        media
      }
    }
  }
`;

export const GET_USERNAME_BY_ID = gql`
query UserComment($userId: ID!) {
  userComment(userId: $userId) {
    username
    _id
  }
}
`;

export const QUERY_THOUGHTS = gql`
query Thoughts {
  thoughts {
    _id
    thoughtText
    media
    createdAt
    comments {
      _id
      commentText
      createdAt
    }
    reactions {
      userId {
        _id
      }
    }
    reactionCount
    topics {
      _id
      topicBody
    }
    user {
      _id
      username
    }
  }
}
`;

export const QUERY_TOPICS = gql`
query Topics {
  topics {
    _id
    topicBody
  }
}
`

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      media
      createdAt
      comments {
        _id
        commentText
        createdAt
        userId {
          _id
          
        }
      }
      user {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstname
      lastname
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
        media
      }
    }
  }
`;
