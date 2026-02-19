import { Box, useMediaQuery } from "@mui/material"
import { useAppSelector } from "@hooks/useAppSelector.js";
import Navbar from "@scenes/navbar/index.js";
import UserWidget from "@scenes/widgets/UserWidget.js";
import MyPostWidget from "@scenes/widgets/MyPostWidget.js";
import PostsWidget from "@scenes/widgets/PostsWidget.js";
import FriendListWidget from "@scenes/widgets/FriendListWidget.js";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget key={user?._id} userId={user?._id} picturePath={user?.picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user?.picturePath} />
          <PostsWidget userId={user?._id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <FriendListWidget userId={user?._id} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage;
