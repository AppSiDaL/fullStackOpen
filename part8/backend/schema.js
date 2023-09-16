const typeDefs = `
type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type UserLoged {
    value: String!
    username: String!
    favoriteGenre: String!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
}

type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

type Query {
    bookCount: Int!
    authorCount: Int!
    me:User
    allBooks(author:String filters:[String] genre:String): [Book!]!
    allAuthors: [Author!]!

  }
  type Mutation {
    addBook(
      title: String!
  
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    addAuthor(
        name: String!
        born: Int
      ): Author!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): UserLoged
  }

  type Subscription {
    bookAdded: Book!
  }
`
module.exports = typeDefs
