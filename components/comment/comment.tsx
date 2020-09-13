import React from "react";
import Link from "next/link";

import Styled from "./comment.style";
import { timeSince } from "utils";
import { Comment as IComment } from "types";

interface Props {
  data: IComment;
}

export default function Comment(props: Props) {
  const { data } = props;

  const date = new Date(data.createdAt).getTime();

  const time = timeSince(date);
  return (
    <Styled.Root>
      <Styled.Top>
        <Link href={"/user/[id]"} as={`/user/${data.author._id}`} passHref>
          <Styled.Author>{data.author.fullName}</Styled.Author>
        </Link>
        <span>-</span>
        <Styled.Time>{time === "just now" ? time : `${time} ago`}</Styled.Time>
      </Styled.Top>
      <Styled.Content>{data.content}</Styled.Content>
    </Styled.Root>
  );
}
