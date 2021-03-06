import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import router, { useRouter } from 'next/router';
import React from 'react'
import { InputField } from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql';
import { createUrqlClient } from '../../../uitls/createUrqlClient';
import { useGetIntId } from '../../../uitls/useGetIntId';
import { useGetPostFromUrl } from '../../../uitls/useGetPostFromUrl';
import createPost from '../../create-post';



const EditPost = ({ }) => {

    const router = useRouter()
    const intId = useGetIntId();
    const [{ data, fetching }] = usePostQuery({
        pause: intId === -1,
        variables: {
            id:intId
        },
    });
    const [ ,updatePost] = useUpdatePostMutation();
    if (fetching) {
        return (
            <Layout>
                <div>loading...</div>
            </Layout>
        );
    }
    if (!data?.post) {
        return (
            <Layout>
                <Box>could not find post</Box>
            </Layout>
        );
      }
    return (
            <Layout variant='small'>
           <Formik initialValues={{ title: data.post.title, text:data.post.text}}
                onSubmit={ async (values) => {
                    await updatePost({ id: intId, ...values })
                    router.back()
                 }}
            >
                {({isSubmitting }) => (
                    <Form>
                        <InputField
                            name="title"
                            placeholder="title"
                            label="title" />
                        <Box mt={4}>
                        <InputField
                                name="text"
                                textarea
                            placeholder="text..."
                            label="Body"
                            
                            />
                        </Box>
                        <Button type="submit"
                            colorScheme="blue"
                            mt={4}
                            isLoading={isSubmitting}>Update Post
                        </Button>
                    </Form>
                )}
            </Formik>  
        </Layout>
    
        );
}

export default withUrqlClient(createUrqlClient)(EditPost);