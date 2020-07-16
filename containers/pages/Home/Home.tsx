import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { SubmitPost } from "containers";
import Styled from './Home.style';
import { State } from "store/initialState";
import { Post } from "types";

interface Props {
  posts: Post[];
}

const Home = (props: Props) => {
  const { posts } = props;
  const user = useSelector((state: State) => state.app.user);
  const [submitFormIsActive, setSubmitFormIsActive] = useState(false);
  const [createdPosts, setCreatedPosts] = useState<Post[]>([]);

  const onSubmitFormClose = () => {
    setSubmitFormIsActive(!submitFormIsActive);};

  const onSuccessPostSubmit = (post: Post) => {
    setSubmitFormIsActive(false);
    setCreatedPosts([ ...createdPosts, post ]);
  };

  const onAddButtonClick = () => {
    if (!user) {
      toast.warn('You need to be authorized to create posts');
      return;
    }
    setSubmitFormIsActive(true);
  };

  const actualPosts = [ ...posts, ...createdPosts ];

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
          {actualPosts?.map(post => {
            return (
              <Styled.Post>
                <h4>{post.title}</h4>
                <Styled.PostUnderTitle>
                  <div>author</div>
                  <div>{post.creationTime}</div>
                </Styled.PostUnderTitle>
                <Styled.PostImage>
                  <img src={post.image} alt={post.description}/>
                </Styled.PostImage>
                {post.description && <pre>{post.description}</pre>}
              </Styled.Post>
            )
          })}
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
