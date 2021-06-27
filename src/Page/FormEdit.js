import React, { useState, useEffect } from "react";
import {
    Button, Label, Input, Form, FormGroup, Row, Col
} from "reactstrap"
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { GET_POST, UPDATE_POST, DELETE_POST } from './Query';

const FormEdit = props => {

    const schema = yup.object().shape({
        body: yup.string().required(),
        title: yup.string().required(),
    });
    const { errors, register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const postId = parseInt(props.match.params.id);
    const [currentTitle, setTitle] = useState()
    const [currentBody, setBody] = useState()
    const [updatePost] = useMutation(UPDATE_POST)

    const onSubmit = input => {
        return new Promise((resolve) => {
            const UpdatePostInput = {
                id: postId,
                body: input.body
            }

            console.log('#####')
            console.log(postId)
            console.log(UpdatePostInput)

            // updatePost({ variables: {  postId, UpdatePostInput } }).then(res => {
            updatePost({ variables: UpdatePostInput }).then(res => {

                alert("Done")

                //resolve(res);
            })
                .catch(e => {
                    console.log(e.message);
                })


        })

    }
    const { loading, error, data } = useQuery(GET_POST)
    useEffect(() => {
        if (!loading && data) {
            setTitle(data.post.title);
            setBody(data.post.body);
        }
    }, [loading, data])
    if (loading) return 'Loading...'
    //your component's return should always be after all hook calls//
    if (error) return `Error! ${error.message}`


    // console.log(currentTitle+" and " +currentBody);


    return (
        <div>
            < Form >
                <Row className="justify-content-center">

                    <Col sm="6">
                        <FormGroup>
                            <Label for="title">title</Label>
                            <Input
                                type="text"
                                name="title"
                                className={`${errors.title && "is-invalid"} `}
                                innerRef={register}
                                value={currentTitle} onChange={event => { setTitle(event.target.value) }}
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
                                value={currentBody} onChange={event => { setBody(event.target.value) }}

                            />
                        </FormGroup>
                    </Col>

                </Row>
                <Button color="primary" onClick={handleSubmit(onSubmit)}>Save</Button>

            </Form >

        </div>
    )
}
export default FormEdit;