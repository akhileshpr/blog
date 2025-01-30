import React, { useState } from 'react';
import { Box, Card, CardContent, Avatar, Typography, Button, Divider, IconButton, TextField } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const Comment = ({comment,  onCommentSubmit }) => {

  

  return (
    <Box>
  
        <Box key={comment._id} mb={2}>
          <Card variant="outlined" sx={{ display: 'flex', padding: 2, alignItems: 'flex-start' }}>
            <Avatar sx={{ width: 50, height: 50 ,marginTop:'1rem'}}>{comment.user[0]}</Avatar>
            <CardContent sx={{ marginLeft: 2, flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {comment.user}
              </Typography>
              <Typography variant="body2">{comment.text}</Typography>
              <Typography variant="caption" sx={{ color: '#777' }}>
                {new Date(comment.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <IconButton size="small" sx={{ marginBottom: 1 }}>
                <ReplyIcon fontSize="small" />
              </IconButton>
              <Button size="small" variant="text" color="primary">
                Reply
              </Button>
              <IconButton size="small">
                <ThumbUpAltIcon fontSize="small" />
              </IconButton>
            </Box>
          </Card>
          <Divider sx={{ marginY: 2 }} />
        </Box>


    </Box>
  );
};

export default Comment;
