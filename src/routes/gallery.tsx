import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { fetchGallery } from '../utils/gallery-engine';

/**
 * @route Gallery
 * @description Displays the Inclusive Asset Library. Refines the visual hierarchy
 * to solve accessibility debt with high-prominence imagery and actionable metadata.
 */
export const Route = createFileRoute('/gallery')({
  loader: () => fetchGallery(),
  component: GalleryComponent,
});

function GalleryComponent() {
  const assets = Route.useLoaderData();

  const [query, setQuery] = React.useState('');

  const filteredAssets = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return assets as any[];

    return (assets as any[]).filter((asset) => {
      const alt = String(asset.alt ?? '').toLowerCase();
      const id = String(asset.publicId ?? '').toLowerCase();
      return alt.includes(q) || id.includes(q);
    });
  }, [assets, query]);

  /**
   * @function copyToClipboard
   * @description Grabs the secure URL and AI-generated caption for external use.
   */
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could replace this with a beautiful toast notification later
  };

  return (
    <div className='max-w-6xl mx-auto px-6 py-12 sm:py-20 space-y-12 sm:space-y-16'>
      <header className='space-y-6 max-w-3xl'>
        <div className='space-y-4'>
          <div className='h-1.5 w-16 bg-indigo-600 rounded-full' />
          <h1 className='text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter'>
            Inclusive Asset Library
          </h1>
          <p className='text-lg text-slate-500 font-medium leading-relaxed'>
            Autonomous accessibility in action. These assets are processed via
            Cloudinary AI v5 to eliminate metadata gaps automatically.
          </p>
        </div>

        {/* Search Section */}
        <div className='bg-white rounded-4xl border border-slate-100 shadow-sm p-3 sm:p-4'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
            <div className='flex-1'>
              <label htmlFor='asset-search' className='sr-only'>
                Search assets
              </label>
              <div className='flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3'>
                <SearchIcon />
                <input
                  id='asset-search'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Search by caption or asset id'
                  className='w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400'
                />
                {query ? (
                  <button
                    type='button'
                    onClick={() => setQuery('')}
                    className='px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition-colors'
                    aria-label='Clear search'
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </div>

            <div className='flex items-center justify-between sm:justify-end gap-3'>
              <div className='px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100'>
                <p className='text-[10px] font-black uppercase tracking-[0.3em] text-slate-400'>
                  Showing
                </p>
                <p className='text-sm font-black text-slate-800'>
                  {filteredAssets.length}{' '}
                  <span className='text-slate-500 font-bold'>
                    / {(assets as any[]).length}
                  </span>
                </p>
              </div>

              <button
                type='button'
                onClick={() =>
                  copyToClipboard(
                    filteredAssets.map((a: any) => a.url).join('\n'),
                  )
                }
                className='px-5 py-3 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors'
                title='Copy visible URLs'
              >
                Copy URLs
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className='flex flex-col gap-10'>
        {filteredAssets.map((asset: any) => {
          /**
           * Using ar_4:3 for a larger image presence that doesn't overwhelm the viewport.
           * c_pad keeps the full image visible, no cropping.
           */
          const displayUrl = asset.url.replace(
            '/upload/',
            '/upload/f_auto,q_auto,c_pad,ar_4:3,b_white/',
          );

          return (
            <div
              key={asset.publicId}
              className='bg-white rounded-[2.5rem] border border-slate-50 shadow-2xl shadow-slate-200/40 overflow-hidden flex flex-col md:flex-row items-stretch'
            >
              {/* Visual Asset: 45% Width for enhanced prominence */}
              <div className='w-full md:w-[45%] bg-white p-6 sm:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-50'>
                <img
                  src={displayUrl}
                  alt={asset.alt}
                  loading='lazy'
                  className='w-full h-full object-contain hover:scale-105 transition-transform duration-500'
                />
              </div>

              {/* Metadata Context: 55% Width */}
              <div className='w-full md:w-[55%] p-8 sm:p-10 md:p-14 flex flex-col justify-between space-y-8'>
                <div className='space-y-6'>
                  <div className='space-y-2'>
                    <span className='text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]'>
                      Autonomous Caption
                    </span>
                    <h2 className='text-lg sm:text-xl font-medium text-slate-700 leading-relaxed italic font-serif'>
                      "{asset.alt}"
                    </h2>
                  </div>

                  {/* URL and Copy Action */}
                  <div className='space-y-2'>
                    <span className='text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]'>
                      Asset Location
                    </span>
                    <div className='flex items-center gap-2 group'>
                      <code className='flex-1 block truncate bg-slate-50 px-4 py-2 rounded-lg text-[11px] text-slate-500 font-medium border border-slate-100'>
                        {asset.url}
                      </code>
                      <button
                        onClick={() => copyToClipboard(asset.url)}
                        className='p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors'
                        title='Copy Asset URL'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={2}
                          stroke='currentColor'
                          className='w-5 h-5'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75'
                          />
                        </svg>
                        <span className='sr-only'>Copy asset url</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className='pt-8 border-t border-slate-100 flex flex-wrap items-center gap-3'>
                  <div className='px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-[10px] font-black border border-green-100 shadow-sm uppercase tracking-widest'>
                    WCAG 2.1 AA Compliant
                  </div>
                  <TechBadge label='f_auto' />
                  <TechBadge label='q_auto' />
                  <TechBadge label='c_pad' />
                  <TechBadge label='v5 engine' />
                </div>
              </div>
            </div>
          );
        })}

        {!filteredAssets.length ? (
          <div className='text-center py-10'>
            <p className='text-sm text-slate-500'>
              No results. Try a different search.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * @component TechBadge
 * @description Consistent UI for Cloudinary technical parameters.
 */
function TechBadge({ label }: { label: string }) {
  return (
    <div className='px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-bold border border-slate-100 uppercase tracking-widest'>
      {label}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      className='text-slate-400 shrink-0'
      aria-hidden='true'
    >
      <path
        d='M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z'
        stroke='currentColor'
        strokeWidth='2'
      />
      <path
        d='M16.2 16.2 21 21'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
}
