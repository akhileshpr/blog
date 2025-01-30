import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBetween from "../components/flexbetween";
import WidgetWrapper from "../widgets/widgetwrapper";
import Users from "../components/users";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSinglePostApi } from "../services/allapis";
import SERVER_URL from "../services/server";
import Comments from "../components/comments";

const Single = () => {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);

  const token = useSelector((state) => state.token);

  const getPost = async () => {
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const result = await getSinglePostApi(postId, reqHeader);
      if (result.status === 200) {
        setPostDetails(result?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost();
  }, [postId]);

  return (
    <WidgetWrapper>
      <Users userPicturePath={postDetails?.userPicturePath} userName={
        postDetails?.userName
      } size="80px" />
      <FlexBetween
        sx={{
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: "1.5rem", md: "2rem" },
          alignItems: "flex-start",
          width: "100%",
          marginTop:'2rem'
        }}
      >
        <Box
          sx={{
            flex: 1.5, 
            textAlign: { xs: "center", md: "left" },
            minWidth: "0",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              fontWeight: "bold",
              wordWrap: "break-word",
            }}
          >
            {postDetails?.title}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
              color: "text.secondary",
              marginBottom: "1rem",
              whiteSpace: "pre-wrap", 
              overflowWrap: "break-word",
              marginTop:'1rem'
            }}
          >
            {postDetails?.description}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1, 
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            width: "100%",
            maxWidth: "40%", 
          }}
        >
          <img
            src={`${SERVER_URL}/Uploads/${postDetails?.picturePath}`}
            alt="Post"
            style={{
              width: "100%", 
              maxHeight: "400px", 
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>
      </FlexBetween>
      <Comments postId={postId}/>
    </WidgetWrapper>
  );
};

export default Single;
