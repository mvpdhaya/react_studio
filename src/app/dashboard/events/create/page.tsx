'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GoogleDriveLogo } from '@/components/google-drive-logo';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function CreateEventPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isDriveConnected, setIsDriveConnected] = useState(false);

  const handleConnectDrive = () => {
    setIsDriveConnected(true);
    toast({
      title: "Google Drive Connected",
      description: "You can now select a folder for your event.",
    });
  };

  const handleCreateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mock creating event
    const newEventId = `evt_${Math.random().toString(36).substring(2, 9)}`;
    toast({
      title: "Event Created!",
      description: "Your event has been successfully created.",
    });
    router.push(`/dashboard/events/${newEventId}`);
  };

  return (
    <div className="mx-auto grid max-w-2xl gap-6">
        <h1 className="text-3xl font-headline font-bold">Create New Event</h1>
        <form onSubmit={handleCreateEvent}>
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
              <CardDescription>Fill in the details for your new event.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input id="eventName" placeholder="e.g., Johnson Wedding" required />
              </div>

              <div className="space-y-2">
                <Label>Google Drive Folder</Label>
                {!isDriveConnected ? (
                  <Button variant="outline" className="w-full" onClick={handleConnectDrive} type="button">
                    <GoogleDriveLogo className="mr-2 h-4 w-4" />
                    Connect Google Drive
                  </Button>
                ) : (
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a folder" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="folder1">2024-05-18_Johnson_Wedding</SelectItem>
                      <SelectItem value="folder2">Acme_Conference_2024</SelectItem>
                      <SelectItem value="folder3">Sarah_Bday_Party</SelectItem>
                      <SelectItem value="folder4">Family_Portraits_Spring_24</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
              <Button type="submit" className="w-full" variant="accent">Create Event</Button>
            </CardContent>
          </Card>
        </form>
    </div>
  );
}
