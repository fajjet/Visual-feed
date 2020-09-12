import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AddComment } from "containers";
import { updateLikes } from "utils/api";
import { State } from "store/initialState";
import { Article, Card } from "components";
import { PostWithPopulatedUsers } from "types";
import Styled from "./post.style";

interface Props {
  data: PostWithPopulatedUsers | null;
}

const Post = (props: Props) => {
  const user = useSelector((state: State) => state.app.user);
  const [data, setData] = useState(props.data);

  const onLikeButtonClick = async (action: boolean, id: string) => {
    if (!user) {
      toast.warn("You need to be logged in to like posts");
      return;
    }
    const res = await updateLikes(action, id);
    const response = await res.json();
    if (response.post) setData(response.post);
    if (response.error) toast.error(response.error);
  };

  const onCommentSubmitSuccess = (post: PostWithPopulatedUsers) => {
    setData(post);
  };

  return (
    <Styled.Root>
      <div className={"content-wrapper"}>
        {!data && <h1>Post not found</h1>}
        {data && (
          <Article
            post={data}
            user={user || null}
            onLikeButtonClick={onLikeButtonClick}
            view={"detail"}
          />
        )}
        <h3>Comments</h3>
        {data?.comments.map((comment) => {
          return (
            <Styled.Comment key={comment._id}>
              <Card noPadding={false}>
                <p>{comment.content}</p>
                <b>by {comment.author.fullName}</b>
                <br />
                <time>{comment.createdAt}</time>
              </Card>
            </Styled.Comment>
          );
        })}
        <Styled.AddComment>
          <AddComment
            postId={data?._id || ""}
            onSubmitSuccess={onCommentSubmitSuccess}
          />
        </Styled.AddComment>
      </div>
    </Styled.Root>
  );
};

export default React.memo(Post);
