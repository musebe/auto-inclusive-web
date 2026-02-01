import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';
import * as React from 'react';
import appCss from '~/styles/app.css?url';
import { seo } from '~/utils/seo';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...seo({
        title: 'Auto-Inclusive Web | Autonomous Accessibility',
        description:
          'Eradicating accessibility debt through autonomous AI pipelines.',
      }),
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
    scripts: [
      {
        src: 'https://upload-widget.cloudinary.com/latest/global/all.js',
        type: 'text/javascript',
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body
        suppressHydrationWarning
        className='antialiased bg-white text-slate-900'
      >
        <nav className='sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md'>
          <div className='max-w-7xl mx-auto px-4 sm:px-8'>
            <div className='h-16 sm:h-20 flex items-center justify-between'>
              <Link to='/' className='flex items-center gap-3 group min-w-0'>
                <div className='w-9 h-9 sm:w-10 sm:h-10 bg-indigo-600 rounded-xl shrink-0 transition-transform group-hover:rotate-6' />
                <span className='font-black text-base sm:text-xl tracking-tighter uppercase truncate'>
                  Auto-Inclusive <span className='text-indigo-600'>Web</span>
                </span>
              </Link>

              <button
                type='button'
                className='sm:hidden inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-700'
                aria-label='Toggle navigation menu'
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? 'Close' : 'Menu'}
              </button>

              <div className='hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-100 p-1.5 rounded-2xl'>
                <NavLink to='/'>Deployment Dashboard</NavLink>
                <NavLink to='/gallery'>Inclusive Asset Library</NavLink>
              </div>
            </div>

            <div
              className={[
                'sm:hidden overflow-hidden transition-[max-height,opacity] duration-200',
                menuOpen ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0',
              ].join(' ')}
            >
              <div className='grid grid-cols-1 gap-2 bg-slate-50 border border-slate-100 p-2 rounded-2xl'>
                <NavLink to='/' onNavigate={() => setMenuOpen(false)}>
                  Deployment Dashboard
                </NavLink>
                <NavLink to='/gallery' onNavigate={() => setMenuOpen(false)}>
                  Inclusive Asset Library
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        <main className='min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)]'>
          {children}
        </main>

        <footer className='py-10 sm:py-12 border-t border-slate-50 text-center px-4'>
          <p className='text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] leading-relaxed'>
            Systemic Accessibility Powered by Cloudinary AI v5
          </p>
        </footer>

        <Scripts />
      </body>
    </html>
  );
}

function NavLink({
  to,
  children,
  onNavigate,
}: {
  to: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={() => onNavigate?.()}
      activeProps={{
        className: 'bg-white shadow-sm text-indigo-600 border-slate-100',
      }}
      activeOptions={{ exact: to === '/' }}
      className='w-full sm:w-auto whitespace-nowrap px-4 sm:px-6 py-3 sm:py-2 rounded-xl text-[11px] sm:text-xs font-black text-slate-500 hover:text-slate-900 border border-transparent transition-all uppercase tracking-widest text-center'
    >
      {children}
    </Link>
  );
}
