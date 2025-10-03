'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Camera } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Suspense } from 'react';

function ResultsComponent({ eventId }: { eventId: string }) {
  const searchParams = useSearchParams();
  const photoIds = searchParams.get('photos')?.split(',') || [];
  const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  
  // We keep the placeholder matching logic for now, but use your backend to serve images.
  const matchedPhotos = PlaceHolderImages.filter(img => photoIds.includes(img.id));

  if (photoIds.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4 text-center">
        <Card className="p-8">
            <Camera className="h-16 w-16 text-muted-foreground mb-4 mx-auto" />
            <h1 className="text-2xl font-bold font-headline">No Photos Found</h1>
            <p className="text-muted-foreground mt-2">We couldn't find any matches for the uploaded selfie.</p>
            <Button asChild variant="outline" className="mt-6">
            <Link href={`/client/${eventId}`}>Try Again</Link>
            </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">We Found Your Photos!</h1>
                <p className="text-muted-foreground">Here are the {photoIds.length} photos we found for you.</p>
            </div>
            <Button size="lg" variant="accent">
                <Download className="mr-2 h-4 w-4" />
                Download All ({photoIds.length})
            </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {photoIds.map((fileId, index) => (
            <Card key={index} className="overflow-hidden group">
              <CardContent className="p-0 relative">
                 <Image
                    src={`${backendApiUrl}/image/${fileId}`}
                    alt={`Matched photo ${index + 1}`}
                    data-ai-hint="event photo"
                    width={600}
                    height={400}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="sm" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                  </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild variant="outline">
                <Link href={`/client/${eventId}`}>Try another selfie</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage({ params }: { params: { eventId: string } }) {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
            <ResultsComponent eventId={params.eventId} />
        </Suspense>
    );
}
