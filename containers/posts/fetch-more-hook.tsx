import {useState, useEffect, useRef} from 'react';
import { PostWithPopulatedUsers } from "types";

import { getPosts } from "utils/api";

interface Props {
  length: number;
  authorId?: string;
}

const FetchMore = (props: Props) => {
  const { length, authorId } = props;
  const [posts, setPosts] = useState<PostWithPopulatedUsers[] | null>([]);

  const isFetching = useRef(false);
  const lastFetchTime = useRef(0);
  const postOffset = useRef(length);

  useEffect(() => {
    if (length < 5) {
      setPosts(null);
    } else {
      postOffset.current = length;
    }
  }, [length]);

  const fetchMore = async () => {
    lastFetchTime.current = Date.now();
    isFetching.current = true;

    const res = await getPosts(postOffset.current, authorId);
    const response = await res.json();
    const posts = response.posts;

    if (res.status === 200 && !!posts?.length) {
      setPosts(response.posts);
      isFetching.current = false;
      postOffset.current += 5;
    }
    if (res.status !== 200 || posts?.length !== 5){
      setPosts(null);
    }
  }

  const onScroll = async () => {
    if (isFetching.current || posts === null) return;
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

  return posts;
};

export default FetchMore;
