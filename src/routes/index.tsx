import { createFileRoute } from '@tanstack/react-router';
import { UploadWidget } from '~/components/UploadWidget';

/**
 * @route Index
 * @description The Deployment Dashboard. This is the primary mission control
 * for ingesting assets into the autonomous accessibility pipeline.
 */
export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className='max-w-5xl mx-auto px-6 py-16 sm:py-24 space-y-16'>
      {/* Strategic Mission Header */}
      <header className='text-center space-y-6 max-w-3xl mx-auto'>
        <div className='inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full'>
          <div className='w-2 h-2 bg-indigo-600 rounded-full animate-pulse' />
          <span className='text-[10px] font-black text-indigo-600 uppercase tracking-widest'>
            Live AI Pipeline
          </span>
        </div>

        <h1 className='text-5xl sm:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]'>
          Auto-Inclusive <span className='text-indigo-600'>Web</span>
        </h1>

        <p className='text-lg sm:text-xl text-slate-500 font-medium leading-relaxed'>
          Millions of people can't "see" the web because images lack
          descriptions. We use{' '}
          <span className='text-slate-900 font-bold'>Cloudinary AI</span> to
          automatically write these descriptions, making the internet accessible
          to everyone instantly.
        </p>
      </header>

      {/* Ingestion Area */}
      <section className='space-y-8'>
        <div className='flex flex-col items-center gap-4'>
          <UploadWidget
            onUploadSuccess={(result) => console.log('Asset Deployed:', result)}
          />

          <div className='flex items-center gap-8 pt-4'>
            <StepIcon
              label='Upload'
              icon='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5'
            />
            <div className='w-8 h-px bg-slate-200' />
            <StepIcon
              label='AI Analysis'
              icon='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z'
            />
            <div className='w-8 h-px bg-slate-200' />
            <StepIcon
              label='Inclusive'
              icon='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className='grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-slate-50'>
        <ImpactCard
          title='Automation'
          desc='No more manual alt-text writing. Our pipeline handles the debt.'
        />
        <ImpactCard
          title='Compliance'
          desc='Meets WCAG 2.1 standards for accessible web content automatically.'
        />
        <ImpactCard
          title='Scale'
          desc='Powered by Cloudinary V5 engine for high-speed asset processing.'
        />
      </section>
    </div>
  );
}

function StepIcon({ label, icon }: { label: string; icon: string }) {
  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2}
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d={icon} />
        </svg>
      </div>
      <span className='text-[9px] font-black text-slate-400 uppercase tracking-widest'>
        {label}
      </span>
    </div>
  );
}

function ImpactCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className='p-8 rounded-4xl bg-slate-50/50 border border-slate-100 space-y-2'>
      <h4 className='font-black text-slate-900 uppercase tracking-tighter text-sm'>
        {title}
      </h4>
      <p className='text-xs text-slate-500 font-medium leading-relaxed'>
        {desc}
      </p>
    </div>
  );
}
