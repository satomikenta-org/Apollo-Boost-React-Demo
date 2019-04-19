import React, { useState } from 'react';
import { useClient } from './graphql-client';
import { GetMyPosts, GetAllPosts } from './graphql/queries';
import { CreatePostMutation } from './graphql/mutations';

const CreatePost = () => {
  const [ title, setTitle ] = useState('');
  const [ post, setPost ] = useState(null);
  const [ posts, setPosts ] = useState(null);
  const [ myPosts, setMyPosts ] = useState(null);

  const client = useClient();
    
  const onChangeInput = e => setTitle(e.target.value);

  const handlePost = async () => {
    try {
      const {data: {createPost} } = await client.mutate({ mutation: CreatePostMutation, variables: {title}});
      setPost(createPost);
    } catch (err) { 
    }
  };

  const handleGetMyPosts = async () => {
    try {
      const { data: {getMyPosts} } = await client.query({ query: GetMyPosts, variables:{} });
      setMyPosts(getMyPosts);
    } catch(err) {
    }
  };

  const handleGetAllPosts = async () => {
    try {
      const { data: { getAllPosts } } = await client.query({ query: GetAllPosts, variables: {} });
      setPosts(getAllPosts);
    } catch(err) {
    }
  };

  return(
    <>
      <h3>Create Post Here</h3>
      <input placeholder="title" value={title} onChange={onChangeInput}/>
      <button onClick={handlePost}>Submit</button>
      { post && (
        <div>
          <h5>Your Newly Created Post is</h5>
          <ul>
            <li>{post.title}</li>
          </ul>
        </div>
      )}
      <br/>
      <h3>Get Your Posts Here</h3>
      <button onClick={handleGetMyPosts}>Get My Posts</button>
      { myPosts && (
        <div>
          <h5>Your Posts</h5>
          <ul>
            { myPosts.map( post  => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}
      <h3>Get All Posts Here</h3>
      <button onClick={handleGetAllPosts}>Get All Posts</button>
      { posts && (
        <div>
          <h5>All Posts</h5>
          <ul>
            { posts.map( post  => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
};

export default CreatePost;