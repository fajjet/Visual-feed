import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Posts, SubmitPost } from "containers";
import Styled from "./home.style";
import { State } from "store/initialState";
import { PostWithPopulatedUsers } from "types";

interface Props {
  posts: PostWithPopulatedUsers[];
}

const Home = (props: Props) => {
  const { posts } = props;
  const user = useSelector((state: State) => state.app.user);
  const [submitFormIsActive, setSubmitFormIsActive] = useState(false);
  const [newPost, setNewPost] = useState<PostWithPopulatedUsers | null>(null);

  const onFormClose = () => {
    setSubmitFormIsActive(!submitFormIsActive);
  };

  const onSubmitSuccess = (post: PostWithPopulatedUsers) => {
    setSubmitFormIsActive(false);
    setNewPost(post);
  };

  const onAddButtonClick = () => {
    if (!user) {
      toast.warn("You have to be authorized to create posts");
      return;
    }
    setSubmitFormIsActive(true);
  };

  return (
    <Styled.Root>
      <div className={"content-wrapper"}>
        <h1>Feed</h1>
        <Styled.AddButton as={"button"} onClick={onAddButtonClick}>
          <span />
        </Styled.AddButton>
        <section>
          <Posts posts={posts} newPost={newPost} />
        </section>
        {user && (
          <SubmitPost
            user={user}
            onClose={onFormClose}
            onSuccessSubmit={onSubmitSuccess}
            isActive={submitFormIsActive}
          />
        )}
      </div>
    </Styled.Root>
  );
};

export default React.memo(Home);
