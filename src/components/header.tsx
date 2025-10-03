import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-center gap-6 text-sm">
          <Link
            href="/#features"
            className="hidden sm:inline-block transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="hidden sm:inline-block transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Pricing
          </Link>
          <Link
            href="/#about"
            className="hidden sm:inline-block transition-colors hover:text-foreground/80 text-foreground/60"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild variant="accent">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
