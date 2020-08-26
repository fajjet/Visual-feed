import React, { useState, useEffect } from 'react';

import { cloudinaryUrl } from 'utils';
import { CloudinaryImage } from 'types';
import Styled from './Image.style';

interface Props {
  image: CloudinaryImage;
  alt?: string;
}

const ImageComponent = (props: Props) => {
  const { image } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const [playState, setPlayState] = useState(false);
  const formattedImage = cloudinaryUrl(image.id);

  const ratio = (image.height / image.width) || 0;
  const isGifFormat = image.format === 'gif';

  const loadNormalSize = (size: 'static' | 'normal') => {
    const image = new Image();
    image.onload = () => { setIsLoaded(true) };
    image.src = formattedImage[size];
  };

  const onPlayStateChange = () => {
    setPlayState(!playState);
  };

  useEffect(() => {
    loadNormalSize(isGifFormat ? 'static' : 'normal');
  }, []);

  const src = isGifFormat ? playState ? formattedImage.normal : formattedImage.static : formattedImage.normal;

  return (
    <Styled.Root>
      {!isLoaded && <div style={{ paddingTop: (ratio * 100) + '%' }}></div>}
      {isLoaded && (
        <img
          src={src}
          alt={props.alt}
        />
      )}
      {isGifFormat && (
        <Styled.Play state={playState}>
          <Styled.PlayButton state={playState} type={'button'} onClick={onPlayStateChange}>
            <span>{playState ? 'STOP' : 'PLAY'}</span>
          </Styled.PlayButton>
        </Styled.Play>
      )}
    </Styled.Root>
  )
};

export default React.memo(ImageComponent);
