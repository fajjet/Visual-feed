import React, { useState, useRef } from 'react';
import { toast } from "react-toastify";
import {useSelector} from "react-redux";

import { PostWithPopulatedUsers, User } from 'types';
import { createPost } from "utils/api";
import Styled from './SubmitPost.style';
import { TextInput } from "components";
import { State } from "store/initialState";

interface Props {
  user: User;
  onClose(): void;
  onSuccessSubmit(post: PostWithPopulatedUsers | undefined): void;
  isActive?: boolean;
}

const SubmitPost = (props: Props) => {
  const user = useSelector((state: State) => state.app.user);
  const { onClose, isActive, onSuccessSubmit } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<undefined | File>(undefined);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<null | HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (loading) return;
      if (!user) throw 'Not authorized';
      if (!image) throw 'No image selected';
      setLoading(true);
      const res = await createPost({ author: user._id, title, description, image });
      const response = await res.json();
      setLoading(false);
      if (res.status === 200) {
        toast.success('Post has been successfully created');
        setTitle('');
        setDescription('');
        setImage(undefined);
        formRef.current?.reset();
        onSuccessSubmit(response.post);
      } else {
        toast.error(response.error);
      }
    } catch (e) {
      toast.error(e);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file);
  };

  return (
    <Styled.Root as={'form'} ref={formRef} onSubmit={onSubmit} isActive={isActive}>
      <div className={'content-wrapper'}>
        <Styled.CloseArea onClick={onClose}/>
        <Styled.Content>
          <h4>Submit a new post</h4>
          <label>
            Image
            <br/>
            <input
              type={'file'}
              required={true}
              onChange={onFileInputChange}
              accept={'.jpg, .jpeg, .png, .gif'}
            />
          </label>
          <TextInput
            value={title}
            label={'Title'}
            onChange={v => setTitle(v)}
            required={true}
            minLength={2}
          />
          <TextInput
            value={description}
            label={'Short description'}
            onChange={v => setDescription(v)}
            as={'textarea'}
          />
          <br/>
          <Styled.ButtonsBar>
            <button type={'submit'} disabled={loading}>{loading ? 'Sending' : 'Submit'}</button>
            <button id={'close'} type={'button'} onClick={onClose}>close</button>
          </Styled.ButtonsBar>
        </Styled.Content>
      </div>
    </Styled.Root>
  )
};

export default React.memo(SubmitPost);
