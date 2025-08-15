import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_LOCALE = 'en';
const LOCALES = ['en', 'es'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico'
  ) {
    return;
  }

  if (LOCALES.some((locale) => pathname.startsWith(`/${locale}`))) {
    return;
  }

  return NextResponse.redirect(
    new URL(`/${DEFAULT_LOCALE}${pathname}`, req.url)
  );
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
