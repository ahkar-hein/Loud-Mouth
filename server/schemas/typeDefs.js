const typeDefs = `
    type User {
        _id: ID!
        firstname: String
        lastname: String
        username: String!
        email: String!
        thoughts: [Thought]
    }

    type Thought {
        _id: ID!
        thoughtText: String
        createdAt: String
        username: User
        commentText: [Comment]
        reactionBody: [Reaction]
        topicBody: [Topic]
    }

    type Comment {
        _id: ID!
        commentText: String
        createdAt: String
        userId: [user]
        thoughtId: [Thought]
    }

    type Reaction {
        _id: ID!
        reactionBody: String
        createdAt: String
        userId: [user]
        thoughtId: [Thought]
        commentId: [Comment]
    }

    type Topic {
        _id: ID!
        topicBody: String
        thought: [Thought]
    }

    type Query {
        user(userId: ID!): User
        thoughts: [Thought]
        thought(thoughtId: ID!): Thought
        topics: [Topic]
        topic(topicId: ID!): Topic
    }

    type Mutation {
        addUser(firstname: String!, lastname: String!, username: String!, email: String!, password: String!): User
        addThought(thoughtText: String!): Thought
        addComment(commentText: String!): Comment
        addReaction(reactionBody: String!): Reaction
        removeThought(thoughtId: ID!): Thought
        removeComment(commentId: ID!): Comment
    }

`;

module.exports = typeDefs;
