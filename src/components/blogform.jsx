import { Box, Button, IconButton, TextField, Typography, Switch } from "@mui/material";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import image1 from "../assets/drag and drop.png";
import { deleteBlogApi, postBlogApi, updateBlogApi } from "../services/allapis";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, setPost, setPosts } from "../redux/store";
import SERVER_URL from "../services/server";
import FlexBetween from "./flexbetween";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogForm = ({ post, onClose }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isPrivate, setIsPrivate] = useState(post?.isPrivate || false);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const handleDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const handleRejected = () => {
    alert("Invalid file type. Only .jpg, .jpeg, and .png are allowed.");
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".jpg,.jpeg,.png",
    multiple: false,
    onDrop: handleDrop,
    onDropRejected: handleRejected,
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });

  const initialValues = {
    title: post?.title || "",
    description: post?.description || "",
  };
  const handleToggle = () => {
    setIsPrivate((prev) => !prev);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const reqHeader = { Authorization: `Bearer ${token}` };
      const reqData = new FormData();
      Object.entries(values).forEach(([k, v]) => reqData.append(k, v));
      reqData.append("isPrivate", isPrivate);
      if (image) {
        reqData.append("picture", image);
      }

      let result;

      if (post) {
        result = await updateBlogApi(post._id, reqData, reqHeader);
        toast.success("updated succesfully...");
        dispatch(setPost({ post: result.data }));
      } else {
        result = await postBlogApi(reqData, reqHeader);
        toast.success("added succesfully...")
        if (result.status === 200) {
          dispatch(setPosts({ posts: result?.data }));
        }
      }

      if (result.status === 200) {
        resetForm();
        setImage(null);
        setPreview(null);
        onClose();
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleDelete = async(id)=>{
    try{
     const result = await deleteBlogApi(id);
     alert('Deleted successfully...')
     if(result.status === 200){
        dispatch(deletePost(id));
        onClose();
     }
    }catch(err){
        console.log(err);
        
    }
    
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h5"
              textAlign="center"
              fontWeight="800"
              mb="1.5rem"
            >
              Post Blog
            </Typography>
            <Box
              sx={{
                display: "grid",
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)", 
                  sm: "repeat(2, 1fr)", 
                },
              }}
            >
              {/* Image Upload Section */}
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%", 
                    maxWidth: "400px",
                    height: "200px",
                    border: "1px dashed lightgray",
                    borderRadius: "1rem",
                    cursor: "pointer",
                    overflow: "hidden",
                    backgroundColor: "#f9f9f9",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <img
                    src={
                      image
                        ? preview
                        : post?.picturePath
                        ? `${SERVER_URL}/Uploads/${post.picturePath}`
                        : image1
                    }
                    alt="Uploaded Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {image && (
                  <Button
                    onClick={() => {
                      setImage(null);
                      setPreview(null);
                    }}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    sx={{ mt: 2 }}
                    color="error"
                  >
                    Remove Image
                  </Button>
                )}
              </Box>

              {/* Form Fields Section */}
              <Box display="flex" flexDirection="column" gap={2} width="100%">
                <TextField
                  label="Title"
                  name="title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.title) && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  fullWidth
                />

                <TextField
                  label="Description"
                  name="description"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Box>
            </Box>

            <Box mt={2}>
              <FlexBetween>
                <Typography>{isPrivate ? "Make Public" : "Make Private"}</Typography>
                <Switch checked={isPrivate} onChange={handleToggle} />
                {post &&<IconButton onClick={()=>handleDelete(post?._id)}>
                  <DeleteIcon />
                </IconButton>}
              </FlexBetween>
            </Box>

            <Button
              fullWidth
              type="submit"
              sx={{
                m: "1rem 0",
                p: "1rem",
                backgroundColor: "paleturquoise",
              }}
            >
              Post
            </Button>
            <ToastContainer/>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default BlogForm;
