import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_POST, DELETE_POST } from './Query';
import { Link } from "react-router-dom";
import * as Icon from 'react-feather'

const Post = ({ id }) => {
    const [deletePost] = useMutation(DELETE_POST);
    const handleOnClick = ()=> {
        deletePost({ variables: { id }});
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
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Management</th>
                    </tr>

                    <tbody>

                        {Array.isArray(data.posts.data) && data.posts.data &&
                            data.posts.data.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td className=" text-center">
                                        <Icon.Edit size={22} className="mr-1 fonticon-wrap cursor" alt="Edit" onClick={() => { setPostID(item.id); console.log(postID) }} />

                                        <button onClick={handleOnClick}>Remove</button>
                                    </td>
                                </tr>

                            ))
                        }

                    </tbody>
                </thead>

            </table>



        </Container>
    );

}


export default Post;
