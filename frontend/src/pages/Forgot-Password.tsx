import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../uitls/createUrqlClient';



const ForgotPassword: React.FC<{}> = ({ }) => {
       const [complete, setComplete]=useState(false)
        const [, forgotPassword] = useForgotPasswordMutation();
    return (
             <Wrapper variant='small'>
            <Formik initialValues={{ email:'' }}
                onSubmit={ async (values) => {
                await forgotPassword(values);
                 setComplete(true);
                    
                }}>
                {({ isSubmitting }) => complete ?
                (<Box>email sent</Box>) :
                (                
                <Form>
                        <InputField
                            name="email"
                            placeholder="email"
                            label="Email"
                            type="email"
                            />
                         <Button
                         type="submit" colorScheme="blue" mt={4} isLoading={isSubmitting}>send Password
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
        );
}
export default withUrqlClient(createUrqlClient) (ForgotPassword);