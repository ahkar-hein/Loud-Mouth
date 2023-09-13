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
query GET_USERNAME_BY_ID($userId: ID!) {
  user(userId: $userId) {
    username
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
    reactionCount
    comments {
      _id
      commentText
      createdAt
    }
    user {
      _id
      username
    }
    reactions {
      _id
    }
    topics {
      _id
      topicBody
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
      user {
        _id
      }
      comments {
        _id
        commentText
        createdAt
        userId {
          _id
        }
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
