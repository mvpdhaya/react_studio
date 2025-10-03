import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
    { href: "/#features", label: "Features" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#how-it-works", label: "How it Works" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center gap-2">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
             {navLinks.map(link => (
                 <Link
                    key={link.href}
                    href={link.href}
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                    {link.label}
                </Link>
             ))}
          </nav>
        </div>
        
        <div className="hidden md:flex items-center justify-end gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>

        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="p-4">
                        <Logo />
                        <nav className="mt-8 flex flex-col gap-4">
                             {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-lg font-medium text-foreground hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-8 flex flex-col gap-4">
                            <Button variant="ghost" asChild><Link href="/login">Log In</Link></Button>
                            <Button asChild><Link href="/login">Get Started</Link></Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
