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
query getThoughts {
  thoughts {
    _id
    thoughtText
    user {
      _id
    }
  }
}
`;

export const GET_TOPICS = gql`
  query getTopics {
    topic {
      _id
      topicBody
      createdAt
    }
    thoughts {
      _id
      thoughtText
      createdAt
    }
  }
`

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
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
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;
