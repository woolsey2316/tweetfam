import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@hooks/useAppSelector";
import { setPosts } from "@state/postsSlice";
import PostWidget from "./PostWidget";
interface Props {
  userId?: string;
  isProfile?: boolean;
}
const PostsWidget = ({ userId, isProfile = false }: Props) => {
  const dispatch = useDispatch();
  const posts = useAppSelector((state) => state.posts);
  const token = useAppSelector((state) => state.auth.token);

  const getPosts = async () => {
    const response = await fetch(`${process.env.API_ORIGIN}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts(data));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${process.env.API_ORIGIN}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts(data));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
