import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
    mutation Authenticate($username: String!, $password: String!) {
        authenticate(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`;

export const CREATEREVIEW = gql`
    mutation CreateReview($ownerName: String!, $rating: Int!, $repositoryName: String!, $text: String) {
        createReview(review: { ownerName: $ownerName, rating: $rating, repositoryName: $repositoryName, text: $text}) {
            repositoryId
        }
    }
`;

export const CREATE_USER = gql`
    mutation CreateUser($user: CreateUserInput) {
        createUser(user: $user) {
            id
            username
        }
    }
`;

export const DELETE_REVIEW = gql`
    mutation deleteReview($id: ID!) {
        deleteReview(id: $id)
    }
`;