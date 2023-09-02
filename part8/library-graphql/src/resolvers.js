const User = require("./models/User");
const Book = require("./models/Book");
const Author = require("./models/Author");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("@apollo/server");
const { GraphQLError } = require("graphql/error");
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    User: async (root, args) => {
      return User.findById(args.id);
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
    allGenres: async () => {
      const books = await Book.find({});
      const allGenres = new Set();
      books.forEach(book => book.genres.forEach(genre => allGenres.add(genre)));
      return Array.from(allGenres);
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
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      });

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
      let book;
      if (!context.currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      console.log('args', args);

      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          const newAuthor = new Author({
            name: args.author,
            born: null,
          });
          await newAuthor.save();
          author = newAuthor;
        }
        book = new Book({ ...args, author: author });
        await book.save();
      } catch (error) {
        throw new GraphQLError('Adding book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        });
      }
      await pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book;
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    },
  },
};

module.exports = resolvers;