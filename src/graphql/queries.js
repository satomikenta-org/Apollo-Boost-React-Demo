import gql from 'graphql-tag';

export const Hello = gql`
    { hello }
`

export const Me = gql`
    {
        me {
            id
            name
            email
        }
    }
` 

export const GetAllPosts = gql`
    {
        getAllPosts {
            id 
            title
            author {
                id
                name
            }
        }
    }
`
export const GetMyPosts = gql`
    {
        getMyPosts {
            id
            title
            author{
                id
                name
            }
        } 
    }
`
