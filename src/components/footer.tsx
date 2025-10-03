import { Logo } from '@/components/logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex flex-col items-center md:items-start gap-4">
                <Logo />
                <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left">
                   The future of photo delivery for professional photographers.
                </p>
            </div>
            <div className="flex gap-8 text-sm">
                <div className="flex flex-col gap-2 items-center md:items-start">
                    <p className="font-semibold">Product</p>
                    <Link href="/#features" className="text-muted-foreground hover:text-foreground">Features</Link>
                    <Link href="/#pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
                </div>
                 <div className="flex flex-col gap-2 items-center md:items-start">
                    <p className="font-semibold">Company</p>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link>
                </div>
            </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
             <p>© {new Date().getFullYear()} StudioMatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
