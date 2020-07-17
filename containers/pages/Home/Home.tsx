import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { updateLikes } from 'utils/api';
import { SubmitPost } from "containers";
import Styled from './Home.style';
import { State } from "store/initialState";
import { PostWithPopulatedUsers } from "types";
import Link from "next/link";

interface Props {
  posts: PostWithPopulatedUsers[];
}

const Home = (props: Props) => {
  const { posts } = props;
  const user = useSelector((state: State) => state.app.user);
  const [submitFormIsActive, setSubmitFormIsActive] = useState(false);
  const [actualPosts, setActualPosts] = useState<PostWithPopulatedUsers[]>([]);

  useEffect(() => {
    setActualPosts(posts || []);
  }, []);

  const onSubmitFormClose = () => {
    setSubmitFormIsActive(!submitFormIsActive);};

  const onSuccessPostSubmit = (post: PostWithPopulatedUsers) => {
    setSubmitFormIsActive(false);
    setActualPosts([ ...actualPosts, post ]);
  };

  const onAddButtonClick = () => {
    if (!user) {
      toast.warn('You need to be authorized to create posts');
      return;
    }
    setSubmitFormIsActive(true);
  };

  const onLikeButtonClick = async (action: boolean, id: string) => {
    if (!user) toast.warn('You need to be logged in to like posts');
    const res = await updateLikes(action, id);
    const response = await res.json();
    if (response.post) {
      setActualPosts(actualPosts.map(post => {
        return (post._id === id && response.post) ? response.post : post;
      }))
    }
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
          {actualPosts?.map(post => {
            const date = new Date(post.creationTime);
            const showDate = date.toLocaleDateString('en-US', {
              day: 'numeric', hour12: false, weekday: 'short',
              year: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric' });
            const isLiked = post.likes.some(id => user?._id === id);
            const likes = !!post.likes.length ? post.likes.length : '';
            return (
              <Styled.Post key={post._id}>
                <h4>{post.title}</h4>
                <Styled.PostUnderTitle>
                  <Styled.PostUnderTitleLeft>
                    <Link href={'/user/[id]'} as={`/user/${post.author._id}`} passHref>
                      <Styled.PostAuthor as={'a'}>👤 <span>{post.author.fullName}</span></Styled.PostAuthor>
                    </Link>
                    <Styled.PostLike
                      isLiked={isLiked}
                      onClick={() => onLikeButtonClick(!isLiked, post._id)}
                    ><span>{isLiked ? '❤' : '🤍'}{likes && <i>{likes}</i>}</span></Styled.PostLike>
                  </Styled.PostUnderTitleLeft>
                  <time>{showDate}</time>
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
