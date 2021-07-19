import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { Flex, IconButton } from '@chakra-ui/react';
import React from 'react'
import { PostSnippetFragment, PostsQuery, useVoteMutation } from '../generated/graphql';

interface UpvoteSectionProps{
    post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({post}) => {
     const [, vote]=useVoteMutation()
    return (
            <Flex direction='column'alignItems='center' justifyContent='center' mr={4}>
            <IconButton
                onClick={() => {
                    if (post.voteStatus === 1) {
                        return;
                    }
                    vote({
                        postId: post.id,
                        value:1
                })
                }}
                colorScheme={post.voteStatus===1?'green':undefined}
                icon={<ArrowUpIcon />}
                aria-label="upvote post" />
              {post.points}
            <IconButton
                onClick={() => {
                    if (post.voteStatus === -1) {
                        return;
                    }
                    vote({
                        postId: post.id,
                        value:-1
                    })
                }}
                colorScheme={post.voteStatus=== -1 ? 'red': undefined}
                icon={<ArrowDownIcon />}
                aria-label="downvote post" />
            </Flex>
        );
}