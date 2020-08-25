import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";

import { Tooltip, Card, Image as ImageComponent } from "components";
import {updateLikes} from 'utils/api';
import Styled from './Posts.style';
import { State } from "store/initialState";
import {PostWithPopulatedUsers} from "types";
import useFetchMore from './FetchMore';

interface Props {
  posts: PostWithPopulatedUsers[];
  newPost?: PostWithPopulatedUsers | null;
  view?: 'user' | 'home';
  authorId?: string;
}

const Posts = (props: Props) => {
  const { posts, newPost, authorId, view = 'home' } = props;
  const user = useSelector((state: State) => state.app.user);
  const [actualPosts, setActualPosts] = useState<PostWithPopulatedUsers[]>(posts);
  const [noMorePosts, setNoMorePosts] = useState(posts.length < 5);

  const morePosts = useFetchMore({ length: actualPosts.length, authorId });

  useEffect(() => {
    if (morePosts !== null) {
      setActualPosts([ ...actualPosts, ...morePosts ]);
    } else {
      setNoMorePosts(true);
    }
  }, [morePosts]);

  useEffect(() => {
    if (newPost) {
      setActualPosts([ newPost, ...actualPosts ]);
    }
  }, [newPost]);

  const onLikeButtonClick = async (action: boolean, id: string) => {
    if (!user) {
      toast.warn('You need to be logged in to like posts');
      return;
    }
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
        const isLiked = post.likes.some(u => u && user?._id === u._id);
        const likes = !!post.likes.length ? post.likes.length : '';
        return (
          <Styled.Post key={post._id}>
            <Card>
            <Styled.Head>
              <h4>{post.title}</h4>
              {post.description && <pre>{post.description}</pre>}
            </Styled.Head>
            <Styled.PostImage>
              <ImageComponent
                image={post.image}
                alt={post.description}
              />
            </Styled.PostImage>
            <Styled.PostBottom>
              <Styled.PostBottomLeft>
                {view === 'home' && (
                  <Link href={'/user/[id]'} as={`/user/${post.author._id}`} passHref>
                    <Styled.PostAuthor as={'a'}>👤 <span>{post.author.fullName}</span></Styled.PostAuthor>
                  </Link>
                )}
                <div style={{ position: 'relative' }} data-tooltip={true}>
                  {!!likes && (<Tooltip>
                    <Styled.LikesList>
                      {post.likes.map(u => {
                        return (
                          <Link href={'/user/[id]'} as={`/user/${u?._id}`} passHref key={u?._id}>
                            <a>{u?.fullName}</a>
                          </Link>
                        )
                      })}
                    </Styled.LikesList>
                  </Tooltip>)}
                  <Styled.PostLike
                    isLiked={isLiked}
                    onClick={() => onLikeButtonClick(!isLiked, post._id)}
                  >
                    <span>❤{!!likes && <i>{likes}</i>}</span>
                  </Styled.PostLike>
                </div>
              </Styled.PostBottomLeft>
              <time>{showDate}</time>
            </Styled.PostBottom>
            </Card>
          </Styled.Post>
        )
      })}
      {!!posts.length && noMorePosts && <h5>There are no more posts to show... yet</h5>}
      {!posts.length && <h5>There are no posts yet... Don't you want to be first?</h5>}
    </>
  )
};

export default React.memo(Posts);
