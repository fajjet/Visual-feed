import React, { useState, useEffect } from 'react';

interface Props {
  lowUrl: string;
  normalUrl: string;
  alt?: string;
}

const ImageComponent = (props: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const image = new Image();
    image.onload = () => { setIsLoaded(true) };
    image.src = props.normalUrl;
  }, []);
  return (
    <img
      src={isLoaded ? props.normalUrl : props.lowUrl}
      alt={props.alt}
    />
  )
};

export default React.memo(ImageComponent);
