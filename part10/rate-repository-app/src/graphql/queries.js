import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query Query(
  $first: Int
  $orderDirection: OrderDirection
  $orderBy: AllRepositoriesOrderBy
  $searchKeyword: String
) {
  repositories(
    first: $first
    orderDirection: $orderDirection
    orderBy: $orderBy
    searchKeyword: $searchKeyword
  ) {
    edges {
      node {
        id
        url
        fullName
        description
        language
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}

`;

export const ME = gql`
query Me ($includeReviews: Boolean = false){
  me {
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          repository {
            id
          }
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;

export const GET_REVIEWS = gql`
query($first: Int, $after: String, $repositoryId: ID!) {
  repository(id: $repositoryId) {
    id
    fullName
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
`;
