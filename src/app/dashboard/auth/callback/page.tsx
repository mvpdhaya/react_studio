'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // The backend handles the cookie exchange. We just need to redirect
    // back to the create page with a query param to trigger the folder fetch.
    router.replace('/dashboard/events/create?connected=true');
  }, [router]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
      <h1 className="text-2xl font-bold">Authenticating with Google...</h1>
      <p className="text-muted-foreground mt-2">Please wait while we securely connect your account.</p>
    </div>
  );
}
