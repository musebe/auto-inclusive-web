import { useState } from 'react';

/**
 * @interface UploadWidgetProps
 * @description Defines the callback for successful asset deployment into the AI pipeline.
 */
interface UploadWidgetProps {
  onUploadSuccess: (result: any) => void;
}

/**
 * @component UploadWidget
 * @description An interactive "Pipeline Ingestion Gateway" that uses a prominent
 * upload icon and explicit calls-to-action to guide users through the
 * autonomous accessibility workflow.
 */
export function UploadWidget({ onUploadSuccess }: UploadWidgetProps) {
  const [isOpening, setIsOpening] = useState(false);

  /**
   * @function openWidget
   * @description Triggers the Cloudinary Upload Widget to handle file selection
   * and initial AI content analysis.
   */
  const openWidget = () => {
    setIsOpening(true);

    // @ts-ignore - Cloudinary is attached to window via remote script
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        folder: 'inclusive_web_assets',
        sources: ['local', 'url', 'camera'],
        googleApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          onUploadSuccess(result.info);
        }
        setIsOpening(false);
      },
    );

    widget.open();
  };

  return (
    <div className='relative w-full max-w-2xl mx-auto group'>
      {/* Dynamic Background Glow */}
      <div className='absolute -inset-1 bg-linear-to-r from-indigo-600 to-blue-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-300' />

      <button
        onClick={openWidget}
        disabled={isOpening}
        className='relative w-full flex flex-col items-center justify-center bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 sm:p-20 transition-all duration-300 hover:border-indigo-400 hover:bg-slate-50/50 hover:shadow-xl'
      >
        {/* Central Action Icon */}
        <div className='mb-8 relative'>
          <div className='w-24 h-24 bg-indigo-600 text-white rounded-4xl flex items-center justify-center shadow-lg shadow-indigo-200 transition-transform group-hover:scale-110 group-hover:-rotate-3 duration-500'>
            {isOpening ? (
              <svg
                className='animate-spin h-10 w-10 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2.5}
                stroke='currentColor'
                className='w-10 h-10'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
                />
              </svg>
            )}
          </div>

          {/* Decorative Floating Elements */}
          {!isOpening && (
            <div className='absolute -top-2 -right-2 bg-blue-500 text-white p-2 rounded-full shadow-md animate-bounce'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-4 h-4'
              >
                <path d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z' />
              </svg>
            </div>
          )}
        </div>

        <div className='text-center space-y-4'>
          <div className='space-y-1'>
            <h3 className='text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase'>
              {isOpening
                ? 'Connecting to Cloudinary'
                : 'Select Files to Deploy'}
            </h3>
            <p className='text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em]'>
              Click to browse or drag and drop
            </p>
          </div>

          <p className='text-slate-500 font-medium max-w-sm mx-auto leading-relaxed text-sm'>
            Leveraging the{' '}
            <span className='text-slate-900 font-bold'>
              Cloudinary Upload Widget
            </span>{' '}
            to ingest, caption, and validate assets for WCAG 2.1 compliance.
          </p>
        </div>

        {/* Status Badges */}
        <div className='mt-12 flex items-center gap-6'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
            <span className='text-[9px] font-bold text-slate-400 uppercase tracking-widest'>
              Pipeline Active
            </span>
          </div>
          <div className='w-px h-4 bg-slate-200' />
          <span className='text-[9px] font-bold text-slate-400 uppercase tracking-widest'>
            v5 AI Ready
          </span>
        </div>
      </button>
    </div>
  );
}
