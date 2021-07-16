import React from "react"
import { NavBar } from "../components/NavBar"
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "../uitls/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Box, Button, Flex, Heading, Link, Stack,Text} from "@chakra-ui/react";
import NextLink from 'next/link'

const Index = () => {

  const [{ data,fetching}] = usePostsQuery({
    variables: {
    limit:10,
    }
  });
  if (!fetching && !data) {
    return
    <div>you got query failed for some reason</div>
  }
  return (
    <Layout>
      <Flex aling="center">
        <Heading>Reddit</Heading>
      <NextLink href="/create-post">
      <Link ml="auto">
        create Post
        </Link>
        </NextLink>
        </Flex>
      <br/>
      {!data && fetching ? (<div>loading...</div>) : (
        <Stack>
        {data!.posts.map((p) =>
       
      <Box key={p.id} p={50}shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{p.title}</Heading>
            <Text mt={4}>{p.textSnippet}</Text>
      </Box>
          )}
        </Stack>
      )}
      {data?( <Flex>
        <Button isLoading={fetching}  m="auto" my={8}>Load More</Button>
      </Flex>):null}
     
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, {ssr:true})(Index);
