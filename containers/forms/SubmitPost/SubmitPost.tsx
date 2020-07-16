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
  const [image, setImage] = useState<undefined | File>(undefined);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;
    const res = await createPost({ authorId: user._id, title, description, image });
    console.log(res)
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
  };

  return (
    <Styled.Root as={'form'} onSubmit={onSubmit}>
      <h4>Submit a new post</h4>
      <label>
        Image
        <br/>
        <input type={'file'} onChange={onFileInputChange}/>
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
