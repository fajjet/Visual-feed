import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Article from "../../components/article/article";
import { updateLikes } from "utils/api";
import { State } from "store/initialState";
import { PostWithPopulatedUsers } from "types";
import useFetchMore from "./fetch-more-hook";

interface Props {
  posts: PostWithPopulatedUsers[];
  newPost?: PostWithPopulatedUsers | null;
  view?: "user" | "home";
  authorId?: string;
}

const Posts = (props: Props) => {
  const { posts, newPost, authorId, view = "home" } = props;
  const user = useSelector((state: State) => state.app.user);
  const [actualPosts, setActualPosts] = useState<PostWithPopulatedUsers[]>(
    posts
  );
  const [noMorePosts, setNoMorePosts] = useState(posts.length < 5);

  const morePosts = useFetchMore({ length: actualPosts.length, authorId });

  useEffect(() => {
    if (morePosts !== null) {
      setActualPosts([...actualPosts, ...morePosts]);
    } else {
      setNoMorePosts(true);
    }
  }, [morePosts]);

  useEffect(() => {
    if (newPost) {
      setActualPosts([newPost, ...actualPosts]);
    }
  }, [newPost]);

  const onLikeButtonClick = async (action: boolean, id: string) => {
    if (!user) {
      toast.warn("You need to be logged in to like posts");
      return;
    }
    const res = await updateLikes(action, id);
    const response = await res.json();
    if (response.post) {
      setActualPosts(
        actualPosts.map((post) => {
          return post._id === id && response.post ? response.post : post;
        })
      );
    }
    if (response.error) {
      toast.error(response.error);
    }
  };

  return (
    <>
      {actualPosts?.map((post) => {
        return (
          <Article
            key={post._id}
            post={post}
            user={user || null}
            view={view}
            onLikeButtonClick={onLikeButtonClick}
          />
        );
      })}
      {!!posts.length && noMorePosts && (
        <h5>There are no more posts to show... yet</h5>
      )}
      {!posts.length && (
        <h5>There are no posts yet... Don't you want to be first?</h5>
      )}
    </>
  );
};

export default React.memo(Posts);
