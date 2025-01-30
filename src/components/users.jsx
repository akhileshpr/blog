import React from "react";
import image from "../assets/Screenshot (97).png";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./flexbetween";
import SERVER_URL from "../services/server";
const Users = ({ postId, userName, userPicturePath,size='40px' }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const profileImage = userPicturePath
    ? `${SERVER_URL}/Uploads/${userPicturePath}`
    : image;

  return (
    <FlexBetween>
      <FlexBetween gap="1.5rem">
        <Box
         width={size}
         height={size}
          component="img"
          src={profileImage}
          alt="user"
          sx={{
            // width: 40,
            // height: 40,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Box sx={{ cursor: "pointer", lineHeight: "0.7rem" }}>
          <Typography
            color={theme.palette.text.primary}
            variant="h6"
            fontWeight="500"
            sx={{
              fontSize: { xs: "0.9rem", md: "0.9rem" },
              fontWeight:'700'
            }}
          >
            {userName}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "0.7rem", md: "0.7rem" },
            }}
          >
           Blog app
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Users;
