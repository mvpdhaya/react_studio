'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { findPhotos } from '@/ai/flows/client-upload-selfie-find-photos';
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
    if (!preview) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please upload a selfie to continue.',
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await findPhotos({
        selfieDataUri: preview,
        eventId: params.eventId,
      });

      const fileIds = result.fileIds;

      if (fileIds && fileIds.length > 0) {
        const query = new URLSearchParams({
          photos: fileIds.join(','),
        }).toString();
        router.push(`/client/${params.eventId}/results?${query}`);
      } else {
        toast({
          title: 'No matches found',
          description: "We couldn't find any photos of you from this event.",
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tighter font-headline">Find Your Photos</CardTitle>
          <CardDescription>Upload a clear selfie to find all your pictures from the event.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="selfie-upload" className="sr-only">Upload Selfie</Label>
              <div className="flex justify-center rounded-lg border-2 border-dashed border-border p-6 hover:border-primary/50 transition-colors">
                <div className="space-y-1 text-center">
                  {preview ? (
                     <Image src={preview} alt="Selfie preview" width={128} height={128} className="mx-auto h-32 w-32 rounded-full object-cover border-2 border-primary/20 shadow-md" />
                  ) : (
                    <div className="flex items-center justify-center h-32 w-32 rounded-full bg-muted mx-auto border-2 border-dashed">
                      <UploadCloud className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex text-sm text-muted-foreground justify-center pt-4">
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
            <Button type="submit" className="w-full !mt-8" size="lg" disabled={isLoading || !file}>
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
