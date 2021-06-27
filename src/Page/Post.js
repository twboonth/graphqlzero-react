import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_POST, DELETE_POST } from './Query';
import { Link } from "react-router-dom";
import * as Icon from 'react-feather'
import PostDetail from './Post-detail'
const Post = ({ id }) => {
    const [deletePost] = useMutation(DELETE_POST);
    const handleOnClick = () => {
        deletePost({ variables: { id } });
    }
    const [postID, setPostID] = useState('');
    const { loading, error, data } = useQuery(GET_ALL_POST)
    if (loading) return 'LOADING'
    if (error) return `${error}`
    return (
        <Container>
            <h1 className="text-center mt-3">GraphZero</h1>
            <hr />
            <table>
                {data.posts.data.map((item, index) => (
                    <tr  key={item.id}>
                        <td onClick={() => setPostID(item.id)}>
                            {item.title}
                        </td>
                        <td><button onClick={() => setPostID(item.id),console.log(postID)}>Set</button></td>
                    </tr>
                ))}

            </table>
            <hr />
            {/* {postID && } */}
            <PostDetail id={postID}></PostDetail>
        </Container>
    );

}


export default Post;
