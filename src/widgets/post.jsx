import React, { useState } from "react";
import image from "../assets/Screenshot (97).png";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import WidgetWrapper from "./widgetwrapper";
import FlexBetween from "../components/flexbetween";
import SERVER_URL from "../services/server";
import { Link, useNavigate } from "react-router-dom";
import Users from "../components/users";
import { setPosts } from "../redux/store";
import { updateLikeApi } from "../services/allapis";
const PostWidget = ({
  postId,
  title,
  postUserId,
  userName,
  description,
  picturePath,
  userPicturePath,
  likes,
  onClick,
}) => {
  const [isComments, setIsComments] = useState(false);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const token = useSelector((state) => state.token);
  const likeCount = Object.keys(likes).length;
  const postLike = async () => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const reqBody = { userId: loggedInUserId };
      const result = await updateLikeApi(postId, reqBody, reqHeader);
      if (result?.status === 200) {
        dispatch(setPosts({ posts: result?.data }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <WidgetWrapper m="2rem 0" border="1px solid black" onClick={onClick}>
        <Users
          postId={postId}
          userName={userName}
          userPicturePath={userPicturePath}
        />
        <Divider sx={{ marginTop: "0.8rem" }} />
        {/* {picturePath && ( */}
        <img
          width="100%"
          height="200px"
          alt="post"
          style={{ borderRadius: "0.25rem", marginTop: "0.75rem" }}
          src={`${SERVER_URL}/Uploads/${picturePath}`}
        />
        {/* )} */}
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography
          height="160px"
          variant="body2"
          noWrap={false}
          sx={{ wordBreak: "break-word", overflowWrap: "break-word" }}
        >
          {description.length > 30
            ? `${description.slice(0, 300)}...`
            : description}
          <Link
            to={`/post/${postId}`}
            style={{ textDecoration: "none", color: "blue" }}
          >
            View More
          </Link>
        </Typography>

        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={postLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: "blue", fontSize: "20px" }} />
                ) : (
                  <FavoriteBorderOutlined sx={{ fontSize: "20px" }} />
                )}
              </IconButton>
              <Typography fontSize="0.8rem">{likeCount}</Typography>
            </FlexBetween>

            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                {/* <ChatBubbleOutlineOutlined  sx={{fontSize:'18px'}}/> */}
              </IconButton>
              {/* <Typography>{comments?.length}</Typography> */}
            </FlexBetween>
          </FlexBetween>
          <IconButton>
            <ShareOutlined sx={{ fontSize: "18px" }} />
          </IconButton>
        </FlexBetween>
      </WidgetWrapper>
    </>
  );
};

export default PostWidget;
