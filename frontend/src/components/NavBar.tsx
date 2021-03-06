import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import React from 'react'
import NextLink from 'next/link'
import { useLoginMutation, useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../uitls/isServer';
import {useRouter} from 'next/router'

interface NavBarProps{ }

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const router = useRouter();
    
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
            <Flex align="center">
                <NextLink href="/create-post">
                    <Button as={Link} mr={4}>
                    create Post
                    </Button>
                </NextLink>
                <Box mr={4}>{data.me.username}</Box>
                <Button onClick={async () => {
                  await  logout()
                    router.reload()
                }}
                    isLoading={logoutFetching}
                variant="link">Logout</Button>
            </Flex>
        )
    }
    return (
        <Flex  zIndex={1} position="sticky" top={0} bg='tomato' p={4} align="center">
            <Flex flex={1} m='auto' maxW={800} align="center">
            <NextLink href="/">
                <Link>
                <Heading>Reddit</Heading>
                </Link>
            </NextLink>
            
            <Box ml={'auto'}>
             {body}
                </Box>
            </Flex>
        </Flex>
        );
}