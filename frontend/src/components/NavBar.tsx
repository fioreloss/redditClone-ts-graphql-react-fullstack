import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from 'next/link'
import { useLoginMutation, useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../uitls/isServer';


interface NavBarProps{ }

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    
    const [{fetching:logoutFetching},logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery({
        pause: isServer(),
    });
    let body = null;


    if (fetching) {

        } else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link color='white' mr={2}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link color='white'>Register</Link>
                </NextLink>
            </>
        )
    } else {
        body = (
            <Flex>
                <Box mr={4}>{data.me.username}</Box>
                <Button onClick={() => {
                    logout()
                }}
                    isLoading={logoutFetching}
                variant="link">Logout</Button>
            </Flex>
        )
    }
    return (
        <Flex bg='tomato' p={4} >
            
            <Box ml={'auto'}>
             {body}
            </Box>
        </Flex>
        );
}