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
import { Loader2, CheckCircle, Zap, ShieldCheck, Star } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';


type DriveFolder = {
  id: string;
  name: string;
};

const plans = [
  { id: 'basic', name: 'Per-Event Basic', price: '$29', features: ['Up to 500 photos', 'Standard indexing'], icon: Zap },
  { id: 'pro', name: 'Per-Event Pro', price: '$99', features: ['Up to 5,000 photos', 'Priority indexing'], icon: Star },
  { id: 'subscribed', name: 'Subscription', price: 'Included', features: ['Use your monthly plan', 'All pro features'], icon: ShieldCheck },
]

function CreateEventFormComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [isDriveConnected, setIsDriveConnected] = useState(false);
  const [folders, setFolders] = useState<DriveFolder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [eventName, setEventName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isFetchingFolders, setIsFetchingFolders] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);

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
  }, [searchParams]);

  const handleConnectDrive = async () => {
    setIsConnecting(true);
    // Simulate API call
    setTimeout(() => {
        router.replace('/dashboard/events/create?connected=true');
    }, 1000);
  };

  const fetchFolders = async () => {
    setIsFetchingFolders(true);
    // Simulate API call
    setTimeout(() => {
      setFolders([
          {id: 'folder1', name: 'Johnson Wedding - May 2024'},
          {id: 'folder2', name: 'Acme Corp Conference'},
          {id: 'folder3', name: 'City Marathon 2024'},
      ]);
      setIsFetchingFolders(false);
    }, 1500);
  };

  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFolder || !eventName || !selectedPlan) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please fill out all fields to create the event.',
      });
      return;
    }
    
    setIsCreating(true);
    setStep(4); // Move to progress step

    // Simulate event creation and indexing progress
    const interval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    toast({
                        title: 'Event Created!',
                        description: 'Your event is now active and ready to be shared.',
                    });
                    router.push(`/dashboard/events/evt-new?name=${encodeURIComponent(eventName)}`);
                }, 500);
                return 100;
            }
            return prev + 10;
        })
    }, 200);
  };
  
  if (step === 4) {
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
                        <Select required onValueChange={setSelectedFolder} value={selectedFolder} disabled={isLoading || step < 2}>
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
                </div>
            </CardContent>
          </Card>

          {/* Step 3: Choose Plan */}
           <Card className={cn("transition-opacity", step < 3 && "opacity-50 pointer-events-none")}>
                <CardHeader>
                   <CardTitle className="flex items-center gap-3">
                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">3</div>
                     Choose a Plan
                    </CardTitle>
                    <CardDescription>Select a plan for this specific event.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup
                        value={selectedPlan}
                        onValueChange={setSelectedPlan}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        required
                    >
                        {plans.map((plan) => (
                            <Label key={plan.id} htmlFor={plan.id} className={cn("block rounded-lg border-2 p-4 cursor-pointer hover:border-primary transition-all", selectedPlan === plan.id && "border-primary ring-2 ring-primary")}>
                                <RadioGroupItem value={plan.id} id={plan.id} className="sr-only" />
                                <div className="flex items-center gap-3 mb-2">
                                    <plan.icon className="h-5 w-5 text-primary" />
                                    <h3 className="font-semibold">{plan.name}</h3>
                                </div>
                                <p className="text-2xl font-bold">{plan.price}</p>
                                <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                                    {plan.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Label>
                        ))}
                    </RadioGroup>
                </CardContent>
           </Card>

            <div className="flex justify-end">
                <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isCreating || !isDriveConnected || !eventName || !selectedFolder || !selectedPlan}
                    onClick={() => {
                      if (step === 2 && eventName && selectedFolder) setStep(3);
                    }}
                >
                  {isCreating ? <Loader2 className="mr-2 animate-spin" /> : null}
                  Create Event & Pay
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
