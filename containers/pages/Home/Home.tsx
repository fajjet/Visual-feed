import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getPosts } from "utils/api";
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

  const isFetching = useRef(false);
  const isEnd = useRef(posts?.length !== 5);
  const lastFetchTime = useRef(0);
  const postOffset = useRef(0);

  const [submitFormIsActive, setSubmitFormIsActive] = useState(false);
  const [newPost, setNewPost] = useState<PostWithPopulatedUsers | null>(null);
  const [loadMorePosts, setLoadMorePosts] = useState<PostWithPopulatedUsers[] | null>(null);
  const [noMorePosts, setNotMorePosts] = useState(posts?.length !== 5);

  const fetchMore = async () => {
    lastFetchTime.current = Date.now();
    isFetching.current = true;
    postOffset.current += 5;

    const res = await getPosts(postOffset.current);
    const response = await res.json();
    const posts = response.posts;

    if (res.status === 200 && !!posts?.length) {
      setLoadMorePosts(response.posts);
      isFetching.current = false;
    }
    if (res.status !== 200 || posts?.length !== 5){
      isEnd.current = true;
      setNotMorePosts(true);
    }
  }

  const onScroll = async () => {
    if (!process.browser || isFetching.current || isEnd.current || !posts?.length) return;
    const now = Date.now();
    if (now - lastFetchTime.current <= 500) return;
    const se = document?.scrollingElement;
    const clientHeight = document.documentElement.clientHeight;
    const point = (se?.scrollHeight || 0) - (clientHeight * 1.5);
    if ((se?.scrollTop || 0) >= point) await fetchMore()
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, []);

  const onSubmitFormClose = () => {
    setSubmitFormIsActive(!submitFormIsActive);
  };

  const onSuccessPostSubmit = (post: PostWithPopulatedUsers) => {
    setSubmitFormIsActive(false);
    setNewPost(post);
    postOffset.current += 1;
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
        <h1>Feed</h1>
        <Styled.AddButton as={'button'} onClick={onAddButtonClick}>
          <span/>
        </Styled.AddButton>
        <section>
          <Posts
            posts={posts}
            newPost={newPost}
            loadMorePosts={loadMorePosts}
          />
          {(!!posts.length || !!newPost) && noMorePosts && <h5>There are no more posts to show... yet</h5>}
          {!posts.length && !newPost && <h5>There are no posts yet... Don't you want to be first?</h5>}
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
