import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth.config';
import { redirect } from 'next/navigation';

/**
 * Verify that the current user has admin access
 * Redirect to homepage if not authorized
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login?callbackUrl=/admin');
  }

  if (session.user.role !== 'admin') {
    redirect('/?error=unauthorized');
  }

  return session;
}
