
'use client';

import Image from 'next/image';
import { Copy, Download, Link as LinkIcon, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchParams, useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Suspense, useState, useEffect } from 'react';

function EventDetailComponent() {
  const params = useParams();
  const eventId = params.eventId as string;
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [clientUrl, setClientUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const eventName = searchParams.get('name') || `Event Details`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/client/${eventId}`;
      setClientUrl(url);
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}`);
    }
  }, [eventId]);


  const handleCopy = async (textToCopy: string) => {
    if (!textToCopy) return;
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
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    // The QR server doesn't provide a direct download with custom names, so we fetch and create a blob
    fetch(qrCodeUrl)
      .then(res => res.blob())
      .then(blob => {
          const objectUrl = URL.createObjectURL(blob);
          link.href = objectUrl;
          link.download = `studiomatch-qr-${eventId}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(objectUrl);
          toast({
            title: "QR Code downloading...",
          });
      })
      .catch(() => {
           toast({
            variant: "destructive",
            title: "Failed to download QR",
            description: "Could not download the QR code image.",
        });
      });
  };

  const statCards = [
      { title: 'Photos in Album', value: '1,283', icon: BarChart3 },
      { title: 'Selfies Uploaded', value: '342', icon: BarChart3 },
      { title: 'Photos Matched', value: '98%', icon: BarChart3 },
      { title: 'Downloads', value: '781', icon: BarChart3 }
  ]


  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter font-headline mb-1">{eventName}</h1>
        <p className="text-muted-foreground">Here's how your event is performing.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map(stat => (
            <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Client Link & QR Code</CardTitle>
            <CardDescription>Share this with your event attendees to let them find their photos.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center gap-4 p-6 bg-muted rounded-lg">
                {qrCodeUrl ? (
                <div className="p-4 bg-white rounded-lg border-2 shadow-md">
                    <Image
                    src={qrCodeUrl}
                    alt="Event QR Code"
                    width={200}
                    height={200}
                    unoptimized
                    />
                </div>
                ) : (
                    <div className="w-[216px] h-[216px] bg-gray-200 rounded-lg animate-pulse" />
                )}
                 <Button variant="default" size="lg" onClick={handleDownloadQR} disabled={!qrCodeUrl} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code
                </Button>
            </div>
            <div className="space-y-4">
                <h3 className="font-semibold">Shareable Link</h3>
                <div className="flex gap-2">
                    <Input value={clientUrl} readOnly className="bg-muted"/>
                    <Button variant="outline" size="icon" onClick={() => handleCopy(clientUrl)} disabled={!clientUrl}>
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy Link</span>
                    </Button>
                </div>
                <Button variant="outline" asChild>
                    <a href={clientUrl} target="_blank" rel="noopener noreferrer">
                        <LinkIcon className="mr-2 h-4 w-4"/>
                        Open Client Page
                    </a>
                </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Actions</CardTitle>
            <CardDescription>Manage your event settings and data.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
             <Button variant="outline">View Drive Folder</Button>
             <Button variant="outline">Re-index Photos</Button>
             <Button variant="destructive">Delete Event</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function EventDetailPage() {
    return (
        <Suspense fallback={<div>Loading event details...</div>}>
            <EventDetailComponent />
        </Suspense>
    )
}
