import React from 'react'
import { Formik, Form } from 'formik'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../uitls/toErrorMap';




interface registerProps {

}



const Register: React.FC<registerProps> = ({ }) => {
    const [, register] = useRegisterMutation();
    return (
        <Wrapper variant='small'>
            <Formik initialValues={{ username: '', password: "" }}
                onSubmit={ async (values,{setErrors}) => {
                    const response = await register(values);
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))
                        
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
                            name="passowrd"
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

export default Register;