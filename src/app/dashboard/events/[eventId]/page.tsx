'use client';

import Image from 'next/image';
import { Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Suspense } from 'react';

function EventDetailComponent({ params }: { params: { eventId: string } }) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  // The backend doesn't store the event name, so we pass it from the create page.
  const eventName = searchParams.get('name') || `Event ${params.eventId}`;
  const clientUrl = `${window.location.origin}/client/${params.eventId}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(clientUrl)}&color=008080&bgcolor=F0F0F0`;

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Copied to clipboard!",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Could not copy text to clipboard.",
      });
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `studiomatch-qr-${params.eventId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
     toast({
        title: "QR Code downloading...",
      });
  };


  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-4">{eventName}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Event Statistics</CardTitle>
            <CardDescription>Overview of client engagement. (Stats are placeholders)</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-1.5">
              <p className="text-sm text-muted-foreground">Photos in Album</p>
              <p className="text-2xl font-semibold">--</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <p className="text-sm text-muted-foreground">Selfies Uploaded</p>
              <p className="text-2xl font-semibold">--</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <p className="text-sm text-muted-foreground">Photos Matched</p>
              <p className="text-2xl font-semibold">--</p>
            </div>
             <div className="flex flex-col space-y-1.5">
              <p className="text-sm text-muted-foreground">Downloads</p>
              <p className="text-2xl font-semibold">--</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Share with Clients</CardTitle>
            <CardDescription>Clients can scan this QR code to find their photos.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="p-4 bg-white rounded-lg border">
                <Image
                src={qrCodeUrl}
                alt="Event QR Code"
                width={200}
                height={200}
                unoptimized
                />
            </div>
            <div className="flex gap-2">
                 <Button variant="outline" size="sm" onClick={() => handleCopy(clientUrl)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownloadQR}>
                    <Download className="mr-2 h-4 w-4" />
                    Download QR
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function EventDetailPage({ params }: { params: { eventId: string } }) {
    return (
        <Suspense fallback={<div>Loading event details...</div>}>
            <EventDetailComponent params={params} />
        </Suspense>
    )
}
