'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GoogleDriveLogo } from '@/components/google-drive-logo';
import { useState, useEffect, Suspense } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type DriveFolder = {
  id: string;
  name: string;
};

function CreateEventFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isDriveConnected, setIsDriveConnected] = useState(false);
  const [folders, setFolders] = useState<DriveFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [eventName, setEventName] = useState('');

  const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  useEffect(() => {
    // This effect runs when the user is redirected back from Google auth
    const connected = searchParams.get('connected');
    if (connected === 'true') {
      setIsDriveConnected(true);
      fetchFolders();
      toast({
        title: 'Google Drive Connected',
        description: 'You can now select a folder for your event.',
      });
    }
  }, [searchParams]);

  const handleConnectDrive = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendApiUrl}/auth`);
      if (!response.ok) throw new Error('Failed to start auth process');
      
      const data = await response.json();
      // Redirect the user to Google's authentication page
      window.location.href = data.auth_url;
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Connection Failed',
        description: 'Could not connect to Google Drive. Please try again.',
      });
      setIsLoading(false);
    }
  };

  const fetchFolders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendApiUrl}/list_folders`);
      if (!response.ok) throw new Error('Failed to fetch folders');
      const data = await response.json();
      setFolders(data.folders || []);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Could not fetch folders',
        description: 'There was an issue fetching your Google Drive folders.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFolder || !eventName) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please provide an event name and select a folder.',
      });
      return;
    }
    
    setIsLoading(true);

    const formData = new FormData();
    formData.append('folder_id', selectedFolder);
    // Note: The Python backend doesn't use the event name during creation,
    // but we'll include it for potential future use. Your Next.js page will use it.

    try {
      const response = await fetch(`${backendApiUrl}/create_event`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create event');
      }

      const result = await response.json();
      const newEventId = result.event_id;

      toast({
        title: 'Event Created!',
        description: 'Your event is being processed in the background.',
      });
      // We pass the event name in the query to display it on the detail page,
      // as the backend doesn't store it.
      router.push(`/dashboard/events/${newEventId}?name=${encodeURIComponent(eventName)}`);
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: error.message || 'There was an error creating your event.',
      });
    } finally {
      setIsLoading(false);
    }
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
              <Input 
                id="eventName" 
                placeholder="e.g., Johnson Wedding" 
                required 
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label>Google Drive Folder</Label>
              {!isDriveConnected ? (
                <Button variant="outline" className="w-full" onClick={handleConnectDrive} type="button" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 animate-spin" /> : <GoogleDriveLogo className="mr-2 h-4 w-4" />}
                  Connect Google Drive
                </Button>
              ) : (
                <>
                  {isLoading && folders.length === 0 ? (
                    <div className="flex items-center justify-center h-10">
                      <Loader2 className="animate-spin" /> 
                      <span className="ml-2">Fetching folders...</span>
                    </div>
                  ) : (
                    <Select required onValueChange={setSelectedFolder} value={selectedFolder} disabled={isLoading}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a folder" />
                      </SelectTrigger>
                      <SelectContent>
                        {folders.map((folder) => (
                          <SelectItem key={folder.id} value={folder.id}>{folder.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </>
              )}
            </div>
            <Button type="submit" className="w-full" variant="accent" disabled={isLoading || !isDriveConnected || !eventName || !selectedFolder}>
              {isLoading ? <Loader2 className="mr-2 animate-spin" /> : null}
              Create Event
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateEventFormComponent />
    </Suspense>
  );
}
