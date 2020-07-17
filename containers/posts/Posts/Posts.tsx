import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { updateLikes } from 'utils/api';
import Styled from './Posts.style';
import { State } from "store/initialState";
import { PostWithPopulatedUsers } from "types";
import Link from "next/link";

interface Props {
  posts: PostWithPopulatedUsers[];
  newPost?: PostWithPopulatedUsers | null;
  view?: 'user' | 'home';
}

const Posts = (props: Props) => {
  const { posts, newPost, view = 'home' } = props;
  const user = useSelector((state: State) => state.app.user);
  const [actualPosts, setActualPosts] = useState<PostWithPopulatedUsers[]>([]);

  useEffect(() => {
    setActualPosts(posts || []);
  }, []);

  useEffect(() => {
    if (newPost) {
      const find = actualPosts.some(p => p._id === newPost._id);
      if (!find) setActualPosts([ newPost, ...actualPosts ]);
    }
  }, [newPost]);

  const onLikeButtonClick = async (action: boolean, id: string) => {
    if (!user) toast.warn('You need to be logged in to like posts');
    const res = await updateLikes(action, id);
    const response = await res.json();
    if (response.post) {
      setActualPosts(actualPosts.map(post => {
        return (post._id === id && response.post) ? response.post : post;
      }))
    }
    if (response.error) {
      toast.error(response.error);
    }
  };

  return (
    <>
      {actualPosts?.map(post => {
        const date = new Date(post.creationTime);
        const showDate = date.toLocaleDateString('en-US', {
          day: 'numeric', hour12: false,
          month: 'short', hour: 'numeric', minute: 'numeric', year: 'numeric' });
        const isLiked = post.likes.some(u => user?._id === u._id);
        const likes = !!post.likes.length ? post.likes.length : '';
        return (
          <Styled.Post key={post._id}>
            <h4>{post.title}</h4>
            <Styled.PostUnderTitle>
              <Styled.PostUnderTitleLeft>
                {view === 'home' && (
                  <Link href={'/user/[id]'} as={`/user/${post.author._id}`} passHref>
                    <Styled.PostAuthor as={'a'}>👤 <span>{post.author.fullName}</span></Styled.PostAuthor>
                  </Link>
                )}
                <Styled.PostLike
                  isLiked={isLiked}
                  onClick={() => onLikeButtonClick(!isLiked, post._id)}
                ><span>❤{likes && <i>{likes}</i>}</span></Styled.PostLike>
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
    </>
  )
};

export default React.memo(Posts);