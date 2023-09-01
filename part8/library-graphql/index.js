require('dotenv').config()
const { ApolloServer, GraphQLError, AuthenticationError } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const Author = require('./src/models/Author')
const Book = require('./src/models/Book')
const jwt = require('jsonwebtoken');
const User = require('./src/models/User');

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI_DEV

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })


const typeDefs = `
  type User {
    username: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Query {
    me: User
    User(id: ID!): User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    User: async (root, args) => {
      return await User.findById(args.id);
    },
    bookCount: async () => {
      try {
        return await Book.countDocuments();
      } catch (error) {
        throw new Error("Failed to count books:", error);
      }
    },
    authorCount: async () => {
      try {
        return await Author.countDocuments();
      } catch (error) {
        throw new Error("Failed to count authors:", error);
      }
    },
    allBooks: async (root, args) => {
      try {
        let filter = {};
        if (args.author) filter.author = args.author;
        if (args.genre) filter.genres = { $in: [args.genre] };
        return await Book.find(filter).populate('author');
      } catch (error) {
        throw new Error("Failed to get books:", error);
      }
    },
    allAuthors: async () => {
      try {
        return await Author.find({});
      } catch (error) {
        throw new Error("Failed to get authors:", error);
      }
    },
  },
  Author: {
    bookCount: async (root, args) => {
      return await Book.countDocuments({ author: root.id });
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        });
      }

      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== process.env.SECRET_PASSWORD) {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('Authentication required');
      }

      try {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          const newAuthor = new Author({
            name: args.author,
            born: null,
          });
          await newAuthor.save();
        }
        const book = new Book({ ...args, author: author?._id });
        await book.save();
        return book;
      } catch (error) {
        throw new GraphQLError('Adding book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('Authentication required');
      }

      try {
        const author = await Author.findOne({ name: args.name });
        if (!author) return null;
        author.born = args.setBornTo;
        await author.save();
        return author;
      } catch (error) {
        throw new GraphQLError('Editing author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})