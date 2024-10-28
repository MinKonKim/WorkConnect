'use client';

import Image from 'next/image';
import brokenFileImage from '/public/images/common/broken-file.png';
import type { SyntheticEvent } from 'react';
import { StrictNextImagePropsType } from '@/types/common';

const ERROR_IMAGE = brokenFileImage.src;

export type ChatImageProps = Omit<StrictNextImagePropsType, 'alt'> & Partial<Pick<StrictNextImagePropsType, 'alt'>>;

const ChatImage = ({ src = '', onError: _, alt = '', ...props }: ChatImageProps) => {
  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = ERROR_IMAGE;
  };

  return (
    <Image
      src={src}
      onError={handleError}
      alt={alt}
      placeholder="blur"
      blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8d25bPQAHlwLTL4BsmgAAAABJRU5ErkJggg=="
      unoptimized
      {...props}
    />
  );
};

export default ChatImage;
