import { Box, Typography, useTheme } from "@mui/material";
import Friend from "@components/Friend.js";
import WidgetWrapper from "@components/WidgetWrapper.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@hooks/useAppSelector.js";
import { setFriends } from "@state/usersSlice.js";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@utils/api.js";

interface Props {
  userId?: string;
}

const FriendListWidget = ({ userId }: Props) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const friends = useAppSelector((state) => state.user.friends);

  const { data } = useQuery({
    queryKey: ['friends', userId],
    queryFn: () => apiGet(`/users/${userId}/friends`),
  });

  useEffect(() => {
    if (data) {
      dispatch(setFriends({ friends: data }));
    }
  }, [data, dispatch]);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
