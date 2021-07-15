import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../uitls/createUrqlClient";
import { useIsAuth } from "../uitls/useIsAuth";

const CreatePost: React.FC<{}> = ({ }) => {

    const router = useRouter();
     useIsAuth()
    const [, createPost] = useCreatePostMutation();
    return(
        <Layout variant='small'>
           <Formik initialValues={{ title:'', text:''}}
                onSubmit={ async (values) => {
                  const {error}=  await createPost({ input: values })
                    if (!error) {
                        router.push("/")
                    }
                }}>
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
                            isLoading={isSubmitting}>Create Post
                        </Button>
                    </Form>
                )}
            </Formik>  
        </Layout>
    )
}
export default withUrqlClient(createUrqlClient) (CreatePost);