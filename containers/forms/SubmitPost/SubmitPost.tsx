import React, { useState } from 'react';

import { User } from 'types';
import { createPost } from "utils/api/posts";
import Styled from './SubmitPost.style';
import { TextInput } from "components";

interface Props {
  user: User;
}

const SubmitPost = (props: Props) => {
  const { user } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createPost({ authorId: user._id, title, description });
    console.log(res)
  };

  return (
    <Styled.Root as={'form'} onSubmit={onSubmit}>
      <h4>Submit a new post</h4>
      <label>
        Image
        <br/>
        <input type={'file'}/>
      </label>
      <TextInput
        value={title}
        label={'Title'}
        onChange={v => setTitle(v)}
      />
      <TextInput
        value={description}
        label={'Short description'}
        onChange={v => setDescription(v)}
      />
      <br/>
      <button>Submit</button>
    </Styled.Root>
  )
};

export default React.memo(SubmitPost);
