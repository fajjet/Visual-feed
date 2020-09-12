import React from "react";
import Link from "next/link";

import { PostWithPopulatedUsers, User } from "types";
import { Tooltip, Card, Image as ImageComponent } from "components";
import Styled from "./article.style";

interface Props {
  user: User | null;
  post: PostWithPopulatedUsers;
  onLikeButtonClick(isLiked: boolean, id: string): void;
  view?: "user" | "home" | "detail";
}

const Article = (props: Props) => {
  const { user, view, onLikeButtonClick, post } = props;

  const date = new Date(post.creationTime);
  const showDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    hour12: false,
    month: "short",
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
  });
  const isLiked = post.likes.some((u) => u && user?._id === u._id);
  const likes = !!post.likes.length ? post.likes.length : "";

  return (
    <Styled.Root>
      <Card>
        <Styled.Head>
          {view === "detail" ? (
            <h1>{post.title}</h1>
          ) : (
            <Link href={"/post/[id]"} as={`/post/${post._id}`} passHref>
              <a>
                <h4>{post.title}</h4>
              </a>
            </Link>
          )}
          {post.description && <pre>{post.description}</pre>}
        </Styled.Head>
        <Styled.Image>
          <ImageComponent
            image={post.image}
            alt={post.description}
            noHeightLimit={view === "detail"}
          />
        </Styled.Image>
        <Styled.Bottom>
          <Styled.BottomLeft>
            {view !== "user" && (
              <Link
                href={"/user/[id]"}
                as={`/user/${post.author._id}`}
                passHref
              >
                <Styled.Author as={"a"}>
                  👤 <span>{post.author.fullName}</span>
                </Styled.Author>
              </Link>
            )}
            <div style={{ position: "relative" }} data-tooltip={true}>
              {!!likes && (
                <Tooltip>
                  <Styled.LikeList>
                    {post.likes.map((u) => {
                      return (
                        <Link
                          href={"/user/[id]"}
                          as={`/user/${u?._id}`}
                          passHref
                          key={u?._id}
                        >
                          <a>{u?.fullName}</a>
                        </Link>
                      );
                    })}
                  </Styled.LikeList>
                </Tooltip>
              )}
              <Styled.Like
                isLiked={isLiked}
                onClick={() => onLikeButtonClick(!isLiked, post._id)}
              >
                <span>❤{!!likes && <i>{likes}</i>}</span>
              </Styled.Like>
            </div>
          </Styled.BottomLeft>
          <time>{showDate}</time>
        </Styled.Bottom>
      </Card>
    </Styled.Root>
  );
};

export default React.memo(Article);
