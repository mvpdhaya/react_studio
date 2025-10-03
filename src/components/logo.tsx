import { Camera } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Camera className="h-6 w-6 text-primary" />
      <span className="text-xl font-semibold font-headline text-foreground">
        StudioMatch
      </span>
    </div>
  );
}
