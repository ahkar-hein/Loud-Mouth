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
      topic {
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

export const UPDATE_USER = gql`
mutation UpdateUser($username: String!, $email: String!, $password: String!, $imageSrc: String!, $userId: ID!) {
  updateUser(username: $username, email: $email, password: $password, imageSrc: $imageSrc, userId: $userId) {
    _id
    email
    firstname
    imageSrc
    lastname
    password
    username
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

export const UPDATE_THOUGHT = gql `
mutation updateThought($thoughtId: ID!, $thoughtText: String!) {
  updateThought(thoughtId: $thoughtId, thoughtText: $thoughtText) {
    thoughtText
  }
}
`;

export const DELETE_THOUGHT = gql `
mutation removeThought($thoughtId: ID!) {
  removeThought(thoughtId: $thoughtId) {
    thoughtText
  }
}
`;