import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockEvents } from '@/lib/data';
import { format } from 'date-fns';
import { MoreVertical, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function EventsPage() {
  const events = mockEvents;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tighter font-headline">Events</h1>
            <p className="text-muted-foreground">Your recent studio events.</p>
        </div>
         <Button asChild>
            <Link href="/dashboard/events/create">Create New Event</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <Card key={event.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-start justify-between gap-4 p-4">
              <div className="flex-1">
                <CardTitle className="font-bold text-lg mb-1">{event.name}</CardTitle>
                <CardDescription>{format(new Date(event.date), "MMMM d, yyyy")}</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More options</span>
              </Button>
            </CardHeader>
            <CardContent className="flex-1 p-4 pt-0">
                <div className="relative aspect-video w-full mb-4">
                     <Image
                        src={`https://picsum.photos/seed/${event.id}/600/400`}
                        alt={`Thumbnail for ${event.name}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                    />
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{event.photoCount} photos</span>
                    {index % 2 === 0 ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <CheckCircle className="mr-1 h-3 w-3"/> Active
                        </Badge>
                    ) : (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                           <Clock className="mr-1 h-3 w-3"/> Indexing
                        </Badge>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-4 bg-muted/50">
              <Button asChild variant="default" className="w-full">
                <Link href={`/dashboard/events/${event.id}?name=${encodeURIComponent(event.name)}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center text-sm text-muted-foreground">
          Showing <strong>1-{events.length}</strong> of <strong>{events.length}</strong> events.
      </div>
    </div>
  );
}
