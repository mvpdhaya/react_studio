import { Camera } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary p-2 rounded-lg">
        <Camera className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold text-foreground">
        StudioMatch
      </span>
    </div>
  );
}
