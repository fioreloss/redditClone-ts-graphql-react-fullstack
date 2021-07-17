import React from "react"
import { NavBar } from "../components/NavBar"
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "../uitls/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Box, Button, Flex, Heading,  IconButton,  Link, Stack,Text} from "@chakra-ui/react";
import NextLink from 'next/link'

import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { UpvoteSection } from "../components/UpvoteSection";

const Index = () => {

  const [variables, setVariables]= useState({limit:15,cursor:null as null | string});
  const [{ data,fetching}] = usePostsQuery({variables});
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
      <br />
      {!data && fetching ? (<div>loading...</div>) : (
        <Stack>
          {data!.posts.posts.map((p) =>
       
            <Flex key={p.id} p={50} shadow="md" borderWidth="1px">
              <UpvoteSection post={p} />
              <Box>
                <Heading fontSize="xl">{p.title}</Heading>
                <Text>posted by </Text>{p.creator.username}
                <Text mt={4}>{p.textSnippet}</Text>
              </Box>
            </Flex>
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables?.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }}
            isLoading={fetching} m="auto" my={8}>Load More</Button>
        </Flex>) : null}
     
    </Layout>
  );
}

export default withUrqlClient(createUrqlClient, {ssr:true})(Index);
