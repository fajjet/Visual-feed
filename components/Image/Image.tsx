import React, { useState, useEffect } from 'react';

import { cloudinaryUrl } from 'utils';
import { CloudinaryImage } from 'types';

interface Props {
  image: CloudinaryImage;
  alt?: string;
}

const ImageComponent = (props: Props) => {
  const { image } = props;
  const formattedImage = cloudinaryUrl(image.id);
  const [isLoaded, setIsLoaded] = useState(false);
  const ratio = (image.height / image.width) || 0;
  useEffect(() => {
    const image = new Image();
    image.onload = () => { setIsLoaded(true) };
    image.src = formattedImage.normal;
  }, []);
  return (
    <>
      {!isLoaded && <div style={{ paddingTop: (ratio * 100) + '%' }}></div>}
      {isLoaded && (
        <img
          src={formattedImage.normal}
          alt={props.alt}
        />
      )}
    </>
  )
};

export default React.memo(ImageComponent);
