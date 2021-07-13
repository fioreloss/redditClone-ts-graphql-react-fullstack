import React from 'react'
import { Formik, Form } from 'formik'
import { Box, Button,Flex,Link } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../uitls/toErrorMap';
import { useRouter } from 'next/dist/client/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../uitls/createUrqlClient';
import NextLink from 'next/link'



const Login : React.FC<{}> = ({ }) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ usernameOrEmail: '', password: "" }}
                onSubmit={ async (values,{setErrors}) => {
                    const response = await login(values);
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))   
                    } else if (response.data?.login.user) {
                        router.push('/')
                    }
                }}>
                {({isSubmitting }) => (
                    <Form>
                        <InputField
                            name="usernameOrEmail"
                            placeholder="username or email"
                            label="Username or Email" />
                        <Box mt={4}>
                        <InputField
                            name="password"
                            placeholder="password"
                            label="password"
                            type="password"
                            />
                        </Box>
                        <Flex mt={2} >
                        <NextLink href="/forgot-password">
                            <Link ml='auto'>
                                    forget password?
                            </Link>
                        </NextLink>
                        </Flex>
                        <Button type="submit" colorScheme="blue" mt={4} isLoading={isSubmitting}>Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient)(Login);