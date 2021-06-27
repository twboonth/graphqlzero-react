import { gql } from '@apollo/client';

export const ADD_POST = gql`
mutation createPost($title: String!, $body:  String!) {
    createPost(input: {
        title: $title, body: $body
    }) {
      id
      title
      body
    }
  }
`;
/*
export const UPDATE_POST = gql`
mutation updatePost($id: Int!, $body: String!) {
    updatePost(
      id: $id,
      input:  { body: $body }
    ) {
      id
      body
    }
}
`;
*/


export const UPDATE_POST = gql`
mutation Update($id: ID!, $body: String!){
  updatePost(
    id: $id,
    input: { body: $body}
    ) {
      id
      body
    }
  }
`;


export const GET_POST = gql`
query{
  
    post(id: 1) {
      id
      title
      body
    }
  
}
`;


export const GET_USER  = gql`
query {
    user(id: 1) {
      id
      username
      email
      address {
        geo {
          lat
          lng
        }
      }
    }
  }
`;
export const GET_USER_POST = gql`
query {
    user(id: 1) {
      posts {
        data {
          id
          title
        }
      }
    }
  }
`;
export const GET_PHOTO_ALBUM = gql`
query (
    $id: ID!
  ) {
    photo(id: $id) {
      album {
        id
        title
        user {
          id
        }
      }
    }
  }
`;
export const GET_ALL_POST = gql`
query (
    $options: PageQueryOptions
  ) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
`;

export const CREATE_POST = gql`
query (
    $options: PageQueryOptions
  ) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
`;

export const DELETE_POST = gql`
mutation (
    $id: ID!
  ) {
    deletePost(id: $id)
  }
`;