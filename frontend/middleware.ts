import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Check if Supabase environment variables are configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured, allow all requests (demo mode)
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next()
  }

  // Only import Supabase if environment variables are available
  try {
    const { createServerClient } = await import('@supabase/ssr')
    
    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Refresh session if expired - required for Server Components
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Public routes (allowlist, with subpath support)
    const publicRoutes = ['/', '/admin/signup', '/login', '/about', '/terms', '/contact'];
    const isPublic = publicRoutes.some(
      (route) =>
        request.nextUrl.pathname === route ||
        request.nextUrl.pathname.startsWith(route + '/')
    );
    if (isPublic) {
      return supabaseResponse;
    }

    // Only protect these routes
    const protectedRoutes = ['/dashboard', '/admin', '/admin/dashboard'];
    if (
      !user &&
      protectedRoutes.some((route) =>
        request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + '/')
      )
    ) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // If user is signed in and the current path is /login, redirect to /dashboard
    if (user && request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return supabaseResponse
  } catch (error) {
    // If there's any error with Supabase, just continue without authentication
    console.warn('Supabase middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 