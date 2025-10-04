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
import { Loader2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';


type DriveFolder = {
  id: string;
  name: string;
};

function CreateEventFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [isDriveConnected, setIsDriveConnected] = useState(false);
  const [folders, setFolders] = useState<DriveFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [eventName, setEventName] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isFetchingFolders, setIsFetchingFolders] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchFolders = async () => {
    setIsFetchingFolders(true);
    try {
      const response = await fetch('/api/list_folders');
      if (!response.ok) {
        if (response.status === 401) {
          // This means the session is invalid or expired, prompt to connect again.
          setIsDriveConnected(false);
          setStep(1);
           toast({
            variant: 'destructive',
            title: 'Authentication expired',
            description: 'Please connect to Google Drive again.',
          });
          return;
        }
        throw new Error('Failed to fetch folders');
      }
      const data = await response.json();
      setFolders(data.folders || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error fetching folders',
        description: error.message || 'Could not retrieve folders from Google Drive.',
      });
    } finally {
      setIsFetchingFolders(false);
    }
  };

  useEffect(() => {
    const connected = searchParams.get('connected');
    if (connected === 'true') {
      setStep(2);
      setIsDriveConnected(true);
      fetchFolders();
      toast({
        title: 'Google Drive Connected!',
        description: 'You can now select a folder for your event.',
      });
    }
  }, [searchParams, toast]);

  const handleConnectDrive = async () => {
    setIsConnecting(true);
    try {
        const response = await fetch('/api/auth');
        if (!response.ok) {
            throw new Error('Failed to get authentication URL from server.');
        }
        const data = await response.json();
        if (data.auth_url) {
            // Redirect to Google's auth URL
            window.location.href = data.auth_url;
        } else {
            throw new Error('No authentication URL returned.');
        }
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Connection Failed',
            description: error.message || 'Could not initiate connection with Google Drive.',
        });
        setIsConnecting(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFolder || !eventName) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please fill out all fields to create the event.',
      });
      return;
    }
    
    setIsCreating(true);
    setStep(3);

    // Simulate creation progress on the frontend
    const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 95)); // Simulate progress
    }, 500);


    try {
        const formData = new FormData();
        formData.append('folder_id', selectedFolder);
        // Although the backend doesn't use eventName, we keep it for frontend routing
        
        const response = await fetch('/api/create_event', {
            method: 'POST',
            body: formData,
        });

        clearInterval(progressInterval);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Failed to create event');
        }

        const result = await response.json();
        const newEventId = result.event_id;

        setProgress(100);
        toast({
            title: 'Event Created!',
            description: result.message || 'Your event is now active and ready to be shared.',
        });

        setTimeout(() => {
            router.push(`/dashboard/events/${newEventId}?name=${encodeURIComponent(eventName)}`);
        }, 500);

    } catch (error: any) {
        clearInterval(progressInterval);
        setIsCreating(false);
        setStep(2); // Go back to the form step on error
        setProgress(0);
        toast({
            variant: 'destructive',
            title: 'Event Creation Failed',
            description: error.message,
        });
    }
  };
  
  if (step === 3) {
      return (
          <div className="mx-auto grid max-w-2xl gap-6 place-items-center text-center">
              <Card className="w-full p-8">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold tracking-tighter font-headline">Creating Your Event</CardTitle>
                    <CardDescription>Please wait while we index the photos. This may take a few minutes.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <Progress value={progress} className="w-full" />
                    <p className="text-muted-foreground">{progress}% complete</p>
                </CardContent>
              </Card>
          </div>
      )
  }

  return (
    <div className="mx-auto grid max-w-4xl gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter font-headline">Create New Event</h1>
        <p className="text-muted-foreground">Follow the steps to set up your new event.</p>
      </div>
      <form onSubmit={handleCreateEvent}>
        <div className="grid gap-8">
          {/* Step 1: Connect Drive */}
          <Card className={cn("transition-opacity", step < 1 && "opacity-50")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">1</div>
                Connect Google Drive
              </CardTitle>
              <CardDescription>Allow StudioMatch to access your photo folders.</CardDescription>
            </CardHeader>
            <CardContent>
              {!isDriveConnected ? (
                <Button variant="default" size="lg" className="w-full max-w-xs" onClick={handleConnectDrive} type="button" disabled={isConnecting}>
                  {isConnecting ? <Loader2 className="mr-2 animate-spin" /> : <GoogleDriveLogo className="mr-2 h-5 w-5" />}
                  Connect Google Drive
                </Button>
              ) : (
                 <div className="flex items-center gap-3 text-lg font-medium text-green-600">
                    <CheckCircle className="h-6 w-6" />
                    <span>Google Drive Connected</span>
                 </div>
              )}
            </CardContent>
          </Card>
          
          {/* Step 2: Event Details */}
          <Card className={cn("transition-opacity", step < 2 && "opacity-50 pointer-events-none")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">2</div>
                Event Details
              </CardTitle>
              <CardDescription>Name your event and select the corresponding folder from your Drive.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="eventName">Event Name</Label>
                  <Input 
                    id="eventName" 
                    placeholder="e.g., Johnson Wedding" 
                    required 
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    disabled={isLoading || step < 2}
                  />
                </div>
                 <div className="space-y-2">
                    <Label>Google Drive Folder</Label>
                    {isFetchingFolders ? (
                        <div className="flex items-center justify-center h-10 rounded-md border">
                            <Loader2 className="animate-spin text-muted-foreground" /> 
                        </div>
                    ) : (
                        <Select required onValueChange={setSelectedFolder} value={selectedFolder} disabled={isLoading || step < 2 || folders.length === 0}>
                            <SelectTrigger>
                                <SelectValue placeholder={folders.length > 0 ? "Select a folder" : "No folders found"} />
                            </SelectTrigger>
                            <SelectContent>
                                {folders.map((folder) => (
                                <SelectItem key={folder.id} value={folder.id}>{folder.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
              <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isCreating || !isDriveConnected || !eventName || !selectedFolder}
              >
                {isCreating ? <Loader2 className="mr-2 animate-spin" /> : null}
                Create Event
              </Button>
          </div>
        </div>
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
