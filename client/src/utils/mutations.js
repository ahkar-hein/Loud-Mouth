import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $firstname: String!, $lastname: String!) {
    addUser(username: $username, email: $email, password: $password, firstname: $firstname, lastname: $lastname) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!, $userId: ID!, $topicId: ID!, $media: String) {
    addThought(thoughtText: $thoughtText, userId: $userId, topicId: $topicId, media: $media) {
      _id
      thoughtText
      media
      user {
        _id
      }
      topics {
        _id
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($commentText: String!, $userId: ID!, $thoughtId: ID!) {
    addComment(commentText: $commentText, userId: $userId, thoughtId: $thoughtId) {
      _id
      commentText
      thoughtId {
        _id
      }
      userId {
        _id
      }
    }
  }
`;

export const ADD_REACTION = gql `
mutation addReaction($thoughtId: ID!, $userId: ID!) {
  addReaction(thoughtId: $thoughtId, userId: $userId) {
    thoughtText
    reactions {
      _id
      userId {
        _id
      }
    }
    reactionCount
  }
}
`;