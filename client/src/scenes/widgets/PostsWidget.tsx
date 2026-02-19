import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@hooks/useAppSelector.js";
import { setPosts } from "@state/postsSlice.js";
import PostWidget from "./PostWidget.js";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@utils/api.js";
import type { Post } from "../../types/post.js";

interface Props {
  userId?: string;
  isProfile?: boolean;
}

const PostsWidget = ({ userId, isProfile = false }: Props) => {
  const dispatch = useDispatch();
  const posts = useAppSelector((state) => state.posts);

  const endpoint = isProfile ? `/posts/${userId}/posts` : '/posts';

  const { data } = useQuery({
    queryKey: ['posts', isProfile ? userId : 'feed'],
    queryFn: () => apiGet<Post[]>(endpoint),
  });

  useEffect(() => {
    if (data) {
      dispatch(setPosts(data));
    }
  }, [data, dispatch]);

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
