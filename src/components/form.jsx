import { Visibility, VisibilityOff } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import image1 from "../assets/profile.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { loginApi, registerAPI } from "../services/allapis";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/store";
import { useDropzone } from "react-dropzone";
const registerSchema = yup.object().shape({
  userName: yup.string().required("First name is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValueRegister = {
  userName: "",
  email: "",
  password: "",
};
const initialValueLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(true);
  const isMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const handleRejected = (rejectedFiles) => {
    alert("Invalid file type. Only .jpg, .jpeg, and .png are allowed.");
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".jpg,.jpeg,.png",
    multiple: false,
    onDrop: handleDrop,
    onDropRejected: handleRejected,
  });

  const register = async (values, onSubmitProps) => {
    try {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
      };
      const reqData = new FormData();
      Object.entries(values).forEach(([k, v]) => reqData.append(k, v));
      if (image) {
        reqData.append("picture", image);
      }
      const result = await registerAPI(reqData, reqHeader);
      if (result.status === 200) {
        toast.success("Register Succesfully..");
        setImage(null);
        onSubmitProps.resetForm();
        setPageType("login");
      }
    } catch (err) {}
  };
  const login = async (values, onSubmitProps) => {
    try {
      const reqData = new FormData();
      Object.entries(values).forEach(([k, v]) => reqData.append(k, v));
      const result = await loginApi(reqData);
      if (result.status === 200) {
        toast.success("Login Succesfully..");
        onSubmitProps.resetForm();
        setPageType("login");
        dispatch(
          setLogin({
            user: result?.data?.user,
            token: result?.data?.token,
          })
        );
        navigate("/home");
      }
      console.log(result);
    } catch (err) {}
  };
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValueLogin : initialValueRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" fontWeight="500" mb="1.5rem">
              {isRegister
                ? "Welcome Back! Please Register"
                : "Welcome Back! Please Login"}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: "1.5rem",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              <Box display="flex" justifyContent="center">
                {isRegister && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "150px",
                      height: "150px",
                      border: "1px dashed lightgray",
                      borderRadius: "50%",
                      cursor: "pointer",
                      overflow: "hidden",
                      backgroundColor: "#f9f9f9",
                    }}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Uploaded Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={image1}
                        alt="Default"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </Box>
                )}
              </Box>

              {isRegister && (
                <>
                  {image && (
                    <Button
                      onClick={() => setImage(null)}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      sx={{ marginBottom: "1rem" }}
                      color="error"
                    >
                      Remove Image
                    </Button>
                  )}
                </>
              )}
              {/* Form Fields */}
              {isRegister && (
                <TextField
                  label="User Name"
                  name="userName"
                  value={values.userName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.userName) && Boolean(errors.userName)}
                  helperText={touched.userName && errors.userName}
                  fullWidth
                />
              )}

              <TextField
                label="Email"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: "paleturquoise",
                  }}
                >
                  {isLogin ? "LOGIN" : "REGISTER"}
                </Button>
                <Typography
                  onClick={() => {
                    setPageType(isLogin ? "register" : "login");
                    resetForm({
                      values: isRegister
                        ? initialValueRegister
                        : initialValueLogin,
                    });
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: palette.primary.main,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  {isLogin
                    ? "Don't have an account? Sign Up here."
                    : "Already have an account? Login here."}
                </Typography>
              </Box>
            </Box>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </form>
        )}
      </Formik>
    </>
  );
};

export default Form;
