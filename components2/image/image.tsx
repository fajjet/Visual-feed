import React, { useState, useEffect } from "react";

import { Loader } from "components";
import { cloudinaryUrl } from "utils";
import { CloudinaryImage } from "types";
import Styled from "./image.style";

interface Props {
  image: CloudinaryImage;
  noHeightLimit?: boolean;
  alt?: string;
}

const ImageComponent = (props: Props) => {
  const { image, noHeightLimit } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const [gifIsLoaded, setGifIsLoaded] = useState(false);
  const [playState, setPlayState] = useState(false);
  const formattedImage = cloudinaryUrl(image.id);

  const ratio = image.height / image.width || 0;
  const isGifFormat = image.format === "gif";

  const loadNormalSize = (size: "static" | "normal") => {
    const image = new Image();
    image.onload = () => {
      isGifFormat && size === "normal"
        ? setGifIsLoaded(true)
        : setIsLoaded(true);
    };
    image.src = formattedImage[size];
  };

  const onPlayStateChange = () => {
    setPlayState(!playState);
    loadNormalSize("normal");
  };

  useEffect(() => {
    loadNormalSize(isGifFormat ? "static" : "normal");
  }, []);

  const src = isGifFormat
    ? playState
      ? formattedImage.normal
      : formattedImage.static
    : formattedImage.normal;
  const showLoader = !isLoaded || (isGifFormat && playState && !gifIsLoaded);

  return (
    <Styled.Root noHeightLimit={noHeightLimit}>
      {!isLoaded && <div style={{ paddingTop: ratio * 100 + "%" }}></div>}
      {isLoaded && <img src={src} alt={props.alt} />}
      {isGifFormat && (
        <Styled.Play state={playState && gifIsLoaded}>
          <Styled.PlayButton
            state={playState}
            type={"button"}
            onClick={onPlayStateChange}
          >
            <span>{playState ? "STOP" : "PLAY"}</span>
          </Styled.PlayButton>
        </Styled.Play>
      )}
      {showLoader && <Loader />}
    </Styled.Root>
  );
};

export default React.memo(ImageComponent);
