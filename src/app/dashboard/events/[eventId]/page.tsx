import Image from 'next/image';
import { Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockEvents } from '@/lib/data';

export default function EventDetailPage({ params }: { params: { eventId: string } }) {
  const event = mockEvents.find((e) => e.id === params.eventId) || {
    ...mockEvents[0],
    id: params.eventId,
    name: 'New Custom Event'
  };
  
  const clientUrl = `http://localhost:9002/client/${event.id}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(clientUrl)}&color=008080&bgcolor=F0F0F0`;

  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-4">{event.name}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Event Statistics</CardTitle>
            <CardDescription>Overview of client engagement.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div className="flex flex-col space-y-1.5">
              <p className="text-sm text-muted-foreground">Photos in Album</p>
              <p className="text-2xl font-semibold">{event.photoCount}</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <p className="text-sm text-muted-foreground">Selfies Uploaded</p>
              <p className="text-2xl font-semibold">128</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <p className="text-sm text-muted-foreground">Photos Matched</p>
              <p className="text-2xl font-semibold">789</p>
            </div>
             <div className="flex flex-col space-y-1.5">
              <p className="text-sm text-muted-foreground">Downloads</p>
              <p className="text-2xl font-semibold">640</p>
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
                 <Button variant="outline" size="sm">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                </Button>
                <Button variant="outline" size="sm">
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
