import React from 'react'
import { Formik, Form } from 'formik'
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../uitls/toErrorMap';
import { useRouter } from 'next/dist/client/router';




const Login : React.FC<{}> = ({ }) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: '', password: "" }}
                onSubmit={ async (values,{setErrors}) => {
                    const response = await login({options: values});
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))   
                    } else if (response.data?.login.user) {
                        router.push('/')
                    }
                }}>
                {({isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username" />
                        <Box mt={4}>
                        <InputField
                            name="password"
                            placeholder="password"
                            label="password"
                            type="password"
                            />
                        </Box>
                        <Button type="submit" colorScheme="blue" mt={4} isLoading={isSubmitting}>Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Login;