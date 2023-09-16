
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),

        allBooks: async (root, args) => {
            try {
                let filteredBooks = await Book.find({}).populate('author')
                console.log(args)

                if (args.author) {
                    filteredBooks = filteredBooks.filter(book => book.author === args.author);
                }

                if (args.genre) {
                    filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre));
                }
                if (args.filter && args.filters.length >= 1) {
                    filteredBooks = filteredBooks.filter((book) => book.genres.some(genre => args.filters.includes(genre)))
                }

                return filteredBooks;
            } catch (error) {
                console.error('Error al obtener los libros:', error);
                throw error;
            }
        },
        allAuthors: async (root, args) => {
            try {
                const authorsWithBookCount = await Author.aggregate([
                    {
                        $lookup: {
                            from: 'books',
                            localField: '_id',
                            foreignField: 'author',
                            as: 'books',
                        },
                    },
                    {
                        $project: {
                            name: 1,
                            born: 1,
                            bookCount: { $size: '$books' },
                        },
                    },
                ]);

                return authorsWithBookCount;
            } catch (error) {
                console.error('Error al obtener los autores:', error);
                throw error;
            }
        },
    },
    Mutation: {
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating the user failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error
                        }
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: { code: 'BAD_USER_INPUT' }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET), username: user.username, favoriteGenre: user.favoriteGenre }
        },
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            const authors = await Author.find({});
            const author = authors.find(a => a.name === args.author)
            if (author) {
                const book = new Book({ ...args, author: author._id })
                try {
                    await book.save()
                } catch (error) {
                    throw new GraphQLError('Saving book failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error
                        }
                    })
                }
                const newBook = await Book.findOne({ title: book.title }).populate('author')
                console.log(newBook)
                pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
                return newBook
            }
            const newAuthor = new Author({ name: args.author, born: null })
            try {
                await newAuthor.save()
            } catch (error) {
                throw new GraphQLError('Saving new author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            const book = new Book({ ...args, author: newAuthor._id })
            try {
                await book.save()
            } catch (error) {
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            const newBook = await Book.findOne({ title: book.title }).populate('author')
            console.log(newBook)
            pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
            return newBook
        },
        addAuthor: async (root, args, context) => {
            const author = new Author({ ...args })
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError('Saving author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }

            return author
        },
        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError('Editing born failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }
            return author
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
    },

};
module.exports = resolvers
