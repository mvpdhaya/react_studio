import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { mockEvents } from '@/lib/data';
import { format } from 'date-fns';

export default function EventsPage() {
  const events = mockEvents;

  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-4">Events</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Events</CardTitle>
          <CardDescription>Manage your studio events.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Photos</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{format(new Date(event.date), "MMMM d, yyyy")}</TableCell>
                  <TableCell>{event.photoCount}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline">
                      <Link href={`/dashboard/events/${event.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
            <div className="text-xs text-muted-foreground">
                Showing <strong>1-{events.length}</strong> of <strong>{events.length}</strong> events.
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
