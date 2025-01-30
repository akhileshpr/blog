import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "../components/form";

const Auth = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Blog
        </Typography>
      </Box>

    <Box padding="2rem">
          <Box
            // display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            mt="0.45rem"
            p="2rem"
            // width={isNonMobileScreens ? "40%" : "90%"}
            maxWidth="500px"
            borderRadius="0.5rem"
            boxShadow="0 4px 12px rgba(0, 0, 0, 0.1)"
            mx="auto"
          >    
          <Form/>
          </Box>
    </Box>
    </Box>
  );
};

export default Auth;
