import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Posts, SubmitPost } from "containers";
import Styled from './Home.style';
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

  const onSubmitFormClose = () => {
    setSubmitFormIsActive(!submitFormIsActive);
  };

  const onSuccessPostSubmit = (post: PostWithPopulatedUsers) => {
    setSubmitFormIsActive(false);
    setNewPost(post);
  };

  const onAddButtonClick = () => {
    if (!user) {
      toast.warn('You need to be authorized to create posts');
      return;
    }
    setSubmitFormIsActive(true);
  };

  return (
    <Styled.Root>
      <div className={'content-wrapper'}>
        <h1>Home</h1>
        <hr/>
        <Styled.AddButton as={'button'} onClick={onAddButtonClick}>
          <span/>
        </Styled.AddButton>
        <section>
          <br/>
          <Posts posts={posts} newPost={newPost}/>
        </section>
        {user && <SubmitPost
          user={user}
          onClose={onSubmitFormClose}
          onSuccessSubmit={onSuccessPostSubmit}
          isActive={submitFormIsActive}
        />}
      </div>
    </Styled.Root>
  )
};

export default React.memo(Home);
