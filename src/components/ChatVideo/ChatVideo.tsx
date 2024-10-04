'use client';

import { ComponentProps, useState } from 'react';
import brokenFileImage from '/public/images/common/broken-file.png';
import clsx from 'clsx';
import ChatImage, { type ChatImageProps } from '../ChatImage';
import { StrictNextImagePropsType } from '@/types/common';

const ERROR_IMAGE = brokenFileImage.src;

type VideoTypes = Omit<ComponentProps<'video'>, 'width' | 'height'>;
type ChatVideoProps = VideoTypes & ChatImageProps & Partial<Pick<StrictNextImagePropsType, 'width' | 'height'>>;

const ChatVideo = ({ src = '', className, width, height, ...props }: ChatVideoProps) => {
  const [hasError, setHasError] = useState(false);

  if (!src) return null;
  if (hasError) {
    return (
      <ChatImage
        src={ERROR_IMAGE}
        alt="error"
        width={width || 200}
        height={height || 200}
        className={clsx('h-auto', className)}
        {...props}
      />
    );
  }

  return (
    <video
      src={src}
      className={clsx(className, 'h-auto')}
      onError={() => setHasError(true)}
      preload="metadata"
      playsInline
      width={width}
      height={height}
      controls
      {...props}
    />
  );
};

export default ChatVideo;
