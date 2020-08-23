import React, { useState, useEffect } from 'react';

import { FormattedImage, ImageFormats } from 'types';

interface Props {
  image: FormattedImage;
  format: ImageFormats;
  alt?: string;
}

const ImageComponent = (props: Props) => {
  const { image: formattedImage } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const image = new Image();
    image.onload = () => { setIsLoaded(true) };
    image.src = formattedImage.normal;
  }, []);
  return (
    <img
      src={isLoaded ? formattedImage.normal : formattedImage.low}
      alt={props.alt}
    />
  )
};

export default React.memo(ImageComponent);
