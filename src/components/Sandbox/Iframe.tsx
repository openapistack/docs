import clsx from 'clsx';
import React, { ComponentPropsWithoutRef, useState } from 'react';

export const Iframe = (
  props: Omit<ComponentPropsWithoutRef<'iframe'>, 'className'>,
) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <iframe
      loading="lazy"
      // the page is cross-origin isolated (COEP) for the StackBlitz sandbox,
      // which blocks cross-origin frames that don't serve COEP themselves;
      // the credentialless attribute (Chromium) exempts this frame from that check
      {...{ credentialless: 'true' }}
      {...props}
      onLoad={() => {
        setLoaded(true);
      }}
      className={clsx(
        'absolute h-full w-full transition-opacity duration-1000',
        loaded ? 'opacity-100' : 'opacity-0',
      )}
    />
  );
};