import React, { useEffect, useState } from "react";
import Comment from "./comment";
import { Box, Button, TextField, Typography } from "@mui/material";
import { getCommentApi, postCommentApi } from "../services/allapis";
import { useDispatch, useSelector } from "react-redux";
import { addComment, setComments } from "../redux/store";

const Comments = ({ postId }) => {
  const [newComment, setNewComment] = useState("");
 const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const comments = useSelector((state) => state.comments);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  const handleSubmit = async () => {
    if (newComment.trim()) {
      try {
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const reqBody = {
          text: newComment,
        };
        const result = await postCommentApi(postId, _id, reqBody, reqHeader);
        if (result.status === 200) {
          dispatch(addComment(result.data.comment));
          setNewComment("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const getComments = async()=>{
    try{
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      }
      const result = await getCommentApi(postId,reqHeader);
      if(result.status === 200){
        dispatch(setComments(result.data.comments));
        
      }
      
    }catch(err){
      console.log(err);
      
    }
  }
  useEffect(()=>{
getComments()
  },[])
  // const comments = [
  //   {
  //     _id: "1",
  //     user: "John Doe",
  //     text: "Great post!",
  //     createdAt: "2025-01-30T12:34:56Z",
  //   },
  //   {
  //     _id: "2",
  //     user: "Jane Smith",
  //     text: "Thanks for the insights.",
  //     createdAt: "2025-01-29T14:20:10Z",
  //   },
  // ];
  return (
    <>
      <Typography variant="h4" p="1rem">
        Comments
      </Typography>
      {comments.map((comment, index) => (
        <Box key={index}>
          <Comment comment={comment} />
        </Box>
      ))}
      <Box sx={{ marginTop: 2 }}>
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          value={newComment}
          onChange={handleCommentChange}
          multiline
          rows={3}
        />
        <Button
          sx={{ marginTop: 1 }}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default Comments;
