import { gql } from '@apollo/client'
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
    }
    genres
  }
`
export const ALL_AUTHORS = gql`
query {
    allAuthors {
    name
    born
    bookCount
  }
}
`;

export const ALL_BOOKS = gql`
  query allBooks($filters: [String]) {
    allBooks(filters: $filters) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
  `;

export const CREATE_BOOK = gql`
mutation addBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!   
) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
  `;
export const EDIT_BIRTH = gql`
  mutation editAuthor($name: String!, $birth: Int!) {
    editAuthor(name: $name, setBornTo: $birth) {
        name
        born
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
      username
      favoriteGenre
    }
  }
`


export const BOOK_ADDED = gql`
subscription Subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
