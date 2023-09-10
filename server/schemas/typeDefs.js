const typeDefs = `
    type User {
        _id: ID!
        firstname: String
        lastname: String
        username: String!
        email: String!
        password: String!
        thoughts: [Thought]
    }

    type Thought {
        _id: ID!
        thoughtText: String
        createdAt: String
        media: String
        user: User
        comments: [Comment]
        reactionBody: [Reaction]
        topics: Topic
    }

    type Comment {
        _id: ID!
        commentText: String
        createdAt: String
        userId: [User]
        thoughtId: [Thought]
    }

    type Reaction {
        _id: ID!
        reactionBody: String
        createdAt: String
        userId: [User]
        thoughtId: [Thought]
        commentId: [Comment]
    }

    type Topic {
        _id: ID!
        topicBody: String
        thought: [Thought]
    }

    type Auth {
        token: ID!
        user: User!
    }

    type Query {
        users: [User]!
        user(userId: ID!): User
        me(userId: ID!): User 
        thoughts: [Thought]
        thought(thoughtId: ID!): Thought
        comments: [Comment]
        topics: [Topic]
        topic(topicId: ID!): Topic
    }

    type Mutation {
        addUser(firstname: String!, lastname: String!, username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(firstname: String!, lastname: String!, username: String!, email: String!, password: String!): User
        addThought(thoughtText: String!, media: String, userId: ID!, topicId: ID!): Thought
        updateThought(thoughtText: String!): Thought
        addComment(commentText: String!): Comment
        addReaction(reactionBody: String!): Reaction
        removeThought(thoughtId: ID!): Thought
        removeComment(commentId: ID!): Comment
    }

`;

module.exports = typeDefs;
