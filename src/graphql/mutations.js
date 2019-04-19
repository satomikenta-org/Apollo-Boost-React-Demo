import gql from 'graphql-tag';

export const CreatePostMutation = gql`
  mutation createPost($title: String!) {
    createPost(title: $title) {
      id
      title
      author {
        id
        name
      }
    } 
  }
  `; 