import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
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

export const GET_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      createdAt
    }
    comment {
      commentText
      createdAt
    }
    user {
      _id
      username
    }
  }
`;

export const GET_TOPICS = gql `
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

export const GET_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const GET_ME = gql`
  query getMe {
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
