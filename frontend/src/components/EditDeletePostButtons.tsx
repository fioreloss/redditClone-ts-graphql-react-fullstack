import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import React from 'react'
import NextLink from "next/link"
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';
import { createPortal } from 'react-dom';


interface EditDeletePostButtonsProps{
    id: number
    creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({ id, creatorId}) => {
    const [, deletePost] = useDeletePostMutation()
    const [{ data: meData }] = useMeQuery();
    
    if (meData?.me?.id !== creatorId) {
        return null;
    }
    return (
               <Box ml='auto'>
                    <NextLink href="/post/edit/[id]" as ={`/post/edit/${id}`}>
                  <IconButton
                    aria-label="edit post"
                      icon={<EditIcon />}
                        mr={4}
                      
                      />
                    </NextLink>
                  <IconButton
                    
                    icon={<DeleteIcon />}
                    aria-label="Delete Post"
                    color="red"
                    onClick={() => {
                      deletePost({ id })
                    }}
                    />
                  </Box>
        );
}