import { NextResponse } from 'next/server';
/* eslint-disable import/prefer-default-export */

export const middleware = (request) => {
  if (request.nextUrl.pathname.startsWith('/callback')) {
    const params = new URLSearchParams(request.nextUrl.search);
    if (params.has('error')) {
      return NextResponse.redirect(request.nextUrl.origin + '/login-failed');
    }
    if (params.has('code')) {
      return NextResponse.redirect(request.nextUrl.origin + '/welcome');
    }
    return NextResponse.redirect(request.nextUrl.origin);
  }
  return NextResponse.next();
};
