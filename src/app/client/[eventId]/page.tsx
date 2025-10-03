'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, UploadCloud } from 'lucide-react';
import Image from 'next/image';

export default function ClientUploadPage({ params }: { params: { eventId: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please upload a selfie to continue.',
      });
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('event_id', params.eventId);
    formData.append('selfie', file);

    try {
      const response = await fetch(`${backendApiUrl}/process_selfie`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to process selfie');
      }

      const result = await response.json();
      const fileIds = result.matches.map((match: any) => match.file_id);

      if (fileIds && fileIds.length > 0) {
        const query = new URLSearchParams({
          photos: fileIds.join(','),
        }).toString();
        router.push(`/client/${params.eventId}/results?${query}`);
      } else {
        toast({
          title: 'No matches found',
          description: 'We couldn\'t find any photos of you from this event.',
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error('Error finding photos:', error);
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: error.message || 'There was an error processing your photo. Please try again.',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Find Your Photos</CardTitle>
          <CardDescription>Upload a clear selfie to find all your pictures from the event.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="selfie-upload" className="sr-only">Upload Selfie</Label>
              <div className="flex justify-center rounded-md border-2 border-dashed border-border px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  {preview ? (
                     <Image src={preview} alt="Selfie preview" width={128} height={128} className="mx-auto h-32 w-32 rounded-full object-cover border" />
                  ) : (
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                  )}
                  <div className="flex text-sm text-muted-foreground justify-center pt-2">
                    <label
                      htmlFor="selfie-upload"
                      className="relative cursor-pointer rounded-md bg-transparent font-medium text-primary focus-within:outline-none hover:text-primary/80"
                    >
                      <span>Upload a file</span>
                      <Input id="selfie-upload" name="selfie-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} disabled={isLoading} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-muted-foreground">PNG, JPG, up to 10MB</p>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || !file}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding your photos...
                </>
              ) : (
                'Find My Photos'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
