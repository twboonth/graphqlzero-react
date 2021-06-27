import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { ADD_POST, GET_POST, DELETE_POST } from './Query';

const PostDetail = ({ id }) => {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');

    const { loading, error, data } = useQuery(GET_POST);
    const [deletePost] = useMutation(DELETE_POST);
    const handleOnClick = ()=> {
        deletePost({ variables: { id }});
      }
    
    useEffect(() => {
        if (!loading && data) {
            setPostTitle(data.post.title);
            setPostBody(data.post.body);
        
        }
    }, [loading, data])
    if (loading) return 'Loading...'               //your component's return should always be after all hook calls//
    if (error) return `Error! ${error.message}`
    // if(postTitle) return `Movie ... do something with the currentMovie`
    return (
        <div>
            <p>{postTitle}</p>
            <p>{postBody}</p>
    <button onClick={handleOnClick}>Remove</button>
        </div>
    )
}
export default PostDetail;