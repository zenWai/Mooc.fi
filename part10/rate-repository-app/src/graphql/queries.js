import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
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

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`;
