import {gql} from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            edges {
                node {
                    description
                    fullName
                    id
                    language
                    name
                    ownerAvatarUrl
                    ownerName
                    ratingAverage
                    reviewCount
                    forksCount
                    stargazersCount
                }
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    query GetRepository($id: ID!) {
        repository(id: $id) {
            id
            fullName
            url
            reviewCount
            language
            description
            ratingAverage
            stargazersCount
            forksCount
            ownerAvatarUrl
            reviews {
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
                }
            }
        }
    }
`;

export const ME = gql`
    query getCurrentUser($includeReviews: Boolean = false){
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        createdAt
                        id
                        rating
                        repository {
                            id
                            ownerName
                            fullName
                        }
                        user {
                            username
                        }
                        repositoryId
                        text
                    }
                }
            }
        }
    }
`;
