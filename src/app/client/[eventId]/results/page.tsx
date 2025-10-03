'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Camera, ShieldX, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { Logo } from '@/components/logo';

function ResultsComponent({ eventId }: { eventId: string }) {
  const searchParams = useSearchParams();
  const photoIdsParam = searchParams.get('photos');
  const photoIds = photoIdsParam ? photoIdsParam.split(',') : [];

  if (photoIds.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
        <Card className="p-8 sm:p-12 shadow-2xl max-w-lg w-full">
            <ShieldX className="h-16 w-16 text-destructive mb-4 mx-auto" />
            <h1 className="text-2xl font-bold font-headline">No Photos Found</h1>
            <p className="text-muted-foreground mt-2 mb-6">We couldn't find any matches for the uploaded selfie. This can happen if the lighting is poor or the face is obscured.</p>
            <Button asChild className="w-full sm:w-auto">
              <Link href={`/client/${eventId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Try Again with a Different Selfie
              </Link>
            </Button>
        </Card>
      </div>
    );
  }

  // This should be replaced with a real API call to fetch image URLs
  const getImageUrl = (fileId: string) => {
    return `https://picsum.photos/seed/${fileId}/600/400`;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
           <Button asChild>
              <Link href={`/client/${eventId}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Try Another Selfie
              </Link>
            </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="text-center md:text-left">
                <p className="text-primary font-semibold">Success!</p>
                <h1 className="text-3xl lg:text-4xl font-bold tracking-tighter font-headline">We Found Your Photos</h1>
                <p className="text-muted-foreground mt-1">Here are the {photoIds.length} photos we found for you.</p>
            </div>
            <Button size="lg" className="w-full md:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Download All ({photoIds.length})
            </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {photoIds.map((fileId, index) => (
            <Card key={index} className="overflow-hidden group relative shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <CardContent className="p-0">
                 <Image
                    src={getImageUrl(fileId)}
                    alt={`Matched photo ${index + 1}`}
                    data-ai-hint="event photo"
                    width={600}
                    height={400}
                    className="aspect-[3/2] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                  </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <footer className="mt-16 py-8 border-t">
        <div className="container text-center text-muted-foreground text-sm">
            <p>Powered by StudioMatch</p>
        </div>
      </footer>
    </div>
  );
}

export default function ResultsPage({ params }: { params: { eventId: string } }) {
    return (
        <Suspense fallback={
          <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-lg font-semibold">Loading results...</p>
            </div>
          </div>
        }>
            <ResultsComponent eventId={params.eventId} />
        </Suspense>
    );
}
