import React from "react"
import { NavBar } from "../components/NavBar"
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "../uitls/createUrqlClient";
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Box, Button, Flex, Heading,  IconButton,  Link, Stack,Text} from "@chakra-ui/react";
import NextLink from 'next/link'

import { useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, DeleteIcon } from "@chakra-ui/icons";
import { UpvoteSection } from "../components/UpvoteSection";

const Index = () => {

  const [variables, setVariables]= useState({limit:15,cursor:null as null | string});
  const [{ data, fetching }] = usePostsQuery({ variables }); 
  const [,deletePost]= useDeletePostMutation()
  if (!fetching && !data) {
    return (
      <div>data not loading</div>
    );
  
  }
  return (
    <Layout>
    
     
      {!data && fetching ? (<div>loading...</div>) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>!p ? null : (
       
            <Flex key={p.id} p={50} shadow="md" borderWidth="1px">
              <UpvoteSection post={p} />
              <Box flex={1}>
                <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                  <Link>
                    <Heading fontSize="xl">{p.title}</Heading>
                  </Link>
                </NextLink>
                <Text>posted by </Text>{p.creator.username}
                <Flex align="center">
                  <Text flex={1} mt={4}>{p.textSnippet}</Text>
                  <IconButton
                    ml="auto"
                    icon={<DeleteIcon />}
                    aria-label="Delete Post"
                    color="red"
                    onClick={() => {
                      deletePost({ id: p.id })
                    }}
                  />
                </Flex>
              </Box>
            </Flex>
          ))}
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
