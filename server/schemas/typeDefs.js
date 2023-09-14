const typeDefs = `
    type User {
        _id: ID!
        firstname: String
        lastname: String
        username: String!
        email: String!
        password: String!
        imageSrc: String
        thoughts: [Thought]
    }

    type Thought {
        _id: ID!
        thoughtText: String
        createdAt: String
        media: String
        user: User
        comments: [Comment]
        reactions: [Reaction]
        topics: [Topic]
        commentCount: Int
        reactionCount: Int
    }

    type Reaction {
        _id: ID!
        userId: User
    }

    type Comment {
        _id: ID!
        commentText: String
        createdAt: String
        userId: [User]!
        thoughtId: [Thought]!
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
        user(username: String!): User
        userComment(userId: ID!): User
        me: User 
        thoughts: [Thought]
        thought(thoughtId: ID!): Thought
        comments: [Comment]
        topics: [Topic]
        topic(topicId: ID!): Topic
    }

    type Mutation {
        addUser(firstname: String!, lastname: String!, username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(userId: ID!, username: String!, email: String!, password: String!, imageSrc: String!): User
        addThought(thoughtText: String!, media: String, userId: ID!, topicId: ID!): Thought
        updateThought(thoughtId: ID!, thoughtText: String!): Thought
        addComment(commentText: String!, userId: ID!, thoughtId: ID!): Comment
        addReaction(thoughtId: ID!, userId: ID!): Thought
        removeThought(thoughtId: ID!): Thought
        removeComment(commentId: ID!): Comment
    }

`;

module.exports = typeDefs;
