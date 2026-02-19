import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@scenes/navbar/index.js";
import FriendListWidget from "@scenes/widgets/FriendListWidget.js";
import MyPostWidget from "@scenes/widgets/MyPostWidget.js";
import PostsWidget from "@scenes/widgets/PostsWidget.js";
import UserWidget from "@scenes/widgets/UserWidget.js";
import { User } from "../../types/user.js";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@utils/api.js";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => apiGet(`/users/${userId}`),
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
