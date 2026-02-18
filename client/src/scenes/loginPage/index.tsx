import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form.js";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        sx={{ backgroundColor: theme.palette.background.alt }}
        p="1rem 6%"
        textAlign="center"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography fontWeight="bold" fontSize="32px" color="text.primary">
            Tweet
          </Typography>

          <Typography fontWeight="bold" fontSize="32px" color="primary">
            |Fam
          </Typography>
        </Box>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        sx={{ backgroundColor: theme.palette.background.alt }}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to TweetFam, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
