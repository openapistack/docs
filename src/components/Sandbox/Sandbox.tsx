import React from 'react';
import { Iframe } from './Iframe';

export const Sandbox = () => {
  const previewURL = 'https://stackblitz.com/edit/stackblitz-starters-wwvp54';

  const previewParams = new URLSearchParams({
    embed: '1',
    hideNavigation: '1',
    terminalHeight: '1',
    showSidebar: '0',
    view: 'editor',
  })

  previewParams.append('file', 'public/openapi.yml');
  previewParams.append('file', 'app/page.tsx');
  previewParams.append('file', 'pages/api/[openapi].ts');

  return (
    <div className="container mt-12">

      <h2 className="scroll-mt-20 text-center text-2xl font-bold text-black hover:no-underline dark:text-white lg:text-3xl">Interactive Example</h2>
      <p className="mx-auto max-w-[60ch] pt-2 text-center text-sm text-zinc-600 dark:text-zinc-300 md:text-base">This is a minimal full-stack React application using openapi-stack and Next.js.</p>

      <div className="z-10 my-0 h-[800px] w-full overflow-hidden rounded-xl md:my-4 lg:my-8" style={{ opacity: '1', transform: 'none' }}>
        <div className="relative h-full overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-700">
          <div className="absolute inset-0 flex animate-pulse flex-col items-center justify-center gap-2 bg-zinc-900">
            <div className="flex gap-2">
              <div className="h-4 w-4 animate-loader rounded-full bg-zinc-400" />
              <div className="h-4 w-4 animate-loader rounded-full bg-zinc-400 animation-delay-200" />
              <div className="h-4 w-4 animate-loader rounded-full bg-zinc-400 animation-delay-300" />
            </div>
            <span className="font-bold text-zinc-200">
              Loading sandbox...
            </span>
          </div>

          <Iframe
            src={[previewURL, previewParams.toString()].join('?')}
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  )
}