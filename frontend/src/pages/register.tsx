import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useRegisterMutation } from '../generated/graphql';
import { createUrqlClient } from '../uitls/createUrqlClient';
import { toErrorMap } from '../uitls/toErrorMap';



interface registerProps {

}

const Register: React.FC<registerProps> = ({ }) => {
    const router = useRouter();
    const [, register] = useRegisterMutation();
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ email:'',username: '', password: "" }}
                onSubmit={ async (values,{setErrors}) => {
                    const response = await register({options:values});
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))   
                    } else if (response.data?.register.user) {
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
                            name="email"
                            placeholder="email"
                            label="email"
                            />
                        </Box>
                        <Box mt={4}>
                        <InputField
                            name="password"
                            placeholder="password"
                            label="password"
                            type="password"
                            />
                        </Box>
                        <Button type="submit" colorScheme="blue" mt={4} isLoading={isSubmitting}>Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default withUrqlClient(createUrqlClient) (Register);