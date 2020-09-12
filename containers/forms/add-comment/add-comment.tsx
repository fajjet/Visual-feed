import React, { useState } from "react";

import { TextInput, Card } from "components";
import Styled from "./add-comment.style";

export default function AddComment() {
  const [comment, setComment] = useState("");

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(comment);
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
