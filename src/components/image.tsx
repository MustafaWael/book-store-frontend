'use client';
import { useState } from 'react';
import NextImage, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

type CustomImageProps = {
  wrapperWidth?: string;
  wrapperHeight?: string;
  wrapperClassName?: string;
  skeletonClassName?: string;
} & ImageProps;

export default function Image({
  className,
  skeletonClassName,
  wrapperClassName,
  wrapperHeight,
  wrapperWidth,
  ...props
}: CustomImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={cn(wrapperClassName, 'relative')}
      style={{
        maxWidth: wrapperWidth || '100%',
        maxHeight: wrapperHeight || '100%',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        className={cn(
          skeletonClassName,
          'absolute z-30 bg-slate-700 w-full h-full transition-opacity duration-700 will-change-[opacity]',
          isLoaded ? 'opacity-0' : 'opacity-100',
        )}
        style={{
          animationDelay: '1s',
          animationDuration: '1.5s',
        }}
      />
      <NextImage
        {...props}
        onLoad={handleLoad}
        className={cn(
          className,
          'transition-opacity duration-1000 will-change-[opacity]',
          isLoaded ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  );
}
