import { CSSProperties, useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  src: string;
  className: string;
  alt: string;
  style?: CSSProperties | undefined;
  timeDelay?: number
  dimensions: {
    height: string
    width: string
  }
};

const ImageLoader = ({ src, className, alt, style, timeDelay=1000, dimensions }: Props) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const delay = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const handleImageLoad = async () => {
    await delay(timeDelay);
    setImageLoaded(true);
  };

  useEffect(() => {
    (async () => handleImageLoad())()
  }, [])

  const imgProps = { src, className, alt, style };

  return (
    <>
      {imageLoaded ? <img {...imgProps}/> : <LoadingSpinner dimensions={dimensions} style={style}/>}
    </>
  )
};

export default ImageLoader;
