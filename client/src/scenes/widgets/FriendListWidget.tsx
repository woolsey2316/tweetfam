import { Box, Typography, useTheme } from "@mui/material";
import Friend from "@components/Friend";
import WidgetWrapper from "@components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@hooks/useAppSelector";
import { setFriends } from "@state/usersSlice";
interface Props {
  userId?: string;
}
const FriendListWidget = ({ userId }: Props) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useAppSelector((state) => state.auth.token);
  const friends = useAppSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:5000/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
