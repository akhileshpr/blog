import { Box, Modal, Pagination, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostWidget from "./post";
import WidgetWrapper from "./widgetwrapper";
import { getBlogsApi, getUserBlogApi } from "../services/allapis";
import { setPosts } from "../redux/store";
import Editblog from "../components/editblog";

const Posts = ({ isUser = false, searchQuery }) => {
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const postsPerPage = 6;
  const userId = useSelector((state) => state.user?._id);
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts || []);
  const dispatch = useDispatch();

  const handleOpen = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const fetchBlogs = async (page) => {
    if (!token) return;
    setLoading(true);
    
    const reqHeader = { Authorization: `Bearer ${token}` };
    try {
      const result = isUser
        ? await getUserBlogApi(userId, page, postsPerPage, reqHeader)
        : await getBlogsApi(page, postsPerPage, reqHeader);

      if (result?.status === 200) {
        dispatch(setPosts({ posts: result?.data?.blogs }));
        setTotalPages(Math.ceil(result?.data?.totalBlogs / postsPerPage));
      } else {
        console.error("Failed to fetch posts:", result?.status);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage, token, userId, isUser]);

  useEffect(() => {
    setCurrentPage(1); // Reset pagination when filtering
  }, [searchQuery, isUser]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  return (
    <WidgetWrapper>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              columnGap: 2,
              rowGap: 2,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
            }}
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostWidget
                key={post._id}
                postId={post._id}
                title={post.title}
                postUserId={post.userId}
                userName={post.userName}
                description={post.description}
                picturePath={post.picturePath}
                userPicturePath={post.userPicturePath}
                likes={post.likes}
                onClick={() => handleOpen(post)}
              />
              ))
            ) : (
              <Box textAlign="center" gridColumn="1 / -1">
                No posts found.
              </Box>
            )}
          </Box>

         {!posts && <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          />}
        </>
      )}

      {isUser && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              width: "50%",
              margin: "auto",
              marginTop: "5%",
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: 24,
            }}
          >
            {selectedPost && <Editblog post={selectedPost} onClose={handleClose} />}
          </Box>
        </Modal>
      )}
    </WidgetWrapper>
  );
};

export default Posts;
