import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { PostWithPopulatedUsers } from "types";
import { State } from "store/initialState";
import { TextInput, Card } from "components";
import Styled from "./add-comment.style";
import { commentPost } from "utils/api";

interface Props {
  postId: string;
  onSubmitSuccess(post: PostWithPopulatedUsers): void;
}

export default function AddComment(props: Props) {
  const { postId, onSubmitSuccess } = props;
  const user = useSelector((state: State) => state.app.user);
  const [comment, setComment] = useState("");

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!user) throw "Not authorized";
      const res = await commentPost({ id: postId, content: comment });
      const response = await res.json();
      if (res.status === 201 && response.post) {
        onSubmitSuccess(response.post);
        toast.success("Comment has been successfully posted");
        setComment("");
      } else {
        const error = response.error || response._message || "Unknown error";
        toast.error(error);
      }
    } catch (e) {
      toast.error(e);
    } finally {
    }
  };

  return (
    <Card>
      <Styled.Root as={"form"} name={"add-comment"} onSubmit={onSubmit}>
        <Styled.Top>
          <h5>Your opinion</h5>
          <button type={"submit"}>Send</button>
        </Styled.Top>
        <TextInput
          as={"textarea"}
          placeholder={"Write something"}
          value={comment}
          onChangeHandler={(e) => setComment(e)}
        />
      </Styled.Root>
    </Card>
  );
}
