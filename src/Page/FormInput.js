import React, { useState, useEffect } from "react";
import {
  Button, Label, Input, Form, FormGroup, Row, Col
} from "reactstrap"
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ADD_POST, GET_POST, UPDATE_POST } from './Query';

const FormInput = (props) => {

  // console.log(props);
  const postId = parseInt(props.match.params.id);
  // console.log(parseInt(PostId));



  // ก่อนที่
  const GetPost = ({ props }) => {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const { loading, error, data } = useQuery(GET_POST);


    useEffect(() => {
      if(!loading && data){
        setPostTitle(data);
      }
    }, [loading, data])
  
  if (loading) return 'Loading...'               //your component's return should always be after all hook calls//
  if (error) return `Error! ${error.message}`
    if(postTitle) return `Movie ... do something with the currentMovie`
    //if (data) return '<h1>Hello</h1>';
    // { JSON.stringify(data.post)}
    //  data.post.map((item, index) => {
    // return (

    //   <pre><h1>{JSON.stringify(data.post.id)}</h1></pre>)
    // });
  }

  const schema = yup.object().shape({
    body: yup.string().required(),
    title: yup.string().required(),
  });

  const { errors, register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [addPost] = useMutation(ADD_POST)


  const onSubmit = input => {
    return new Promise((resolve) => {
      const PostInput = {
        id: postId,
        title: input.title,
        body: input.body
      }

      console.log('#####')
      console.log(PostInput)

      addPost({ variables: PostInput }).then(res => {

        alert("Done")

        //resolve(res);
      })
        .catch(e => {
          console.log(e.message);
        })


    })

  }


  return (
    <div>

      <GetPost postId={postId} />

      <Form>
        <Row className="justify-content-center">

          <Col sm="6">
            <FormGroup>
              <Label for="title">title</Label>
              <Input
                type="text"
                name="title"
                className={`${errors.title && "is-invalid"} `}
                innerRef={register}
              />
            </FormGroup>
          </Col>

          <Col sm="6">
            <FormGroup>
              <Label for="body">body</Label>
              <Input
                type="text"
                name="body"
                className={`${errors.body && "is-invalid"} `}
                innerRef={register}
              />
            </FormGroup>
          </Col>

        </Row>
        <Button color="primary" onClick={handleSubmit(onSubmit)}>Save</Button>

      </Form >

    </div>
  );
}
export default FormInput;