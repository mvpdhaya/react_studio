'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Camera, QrCode, Sparkles, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [portfolioImages, setPortfolioImages] = useState<typeof PlaceHolderImages>([]);

  useEffect(() => {
    setPortfolioImages(PlaceHolderImages.filter(img => img.id.startsWith('portfolio-')).slice(0, 6));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-40 bg-card">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                  Never lose a memory.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  StudioMatch uses AI to instantly find your photos from any event. A simple selfie is all it takes. For studios and their clients.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" variant="accent">
                    <Link href="/login">Get Started for Free</Link>
                  </Button>
                </div>
              </div>
              <Image
                src={portfolioImages[0]?.imageUrl || "https://picsum.photos/seed/hero/1200/800"}
                alt="Hero"
                data-ai-hint={portfolioImages[0]?.imageHint || "wedding couple"}
                width={1200}
                height={800}
                className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A seamless experience for both photography studios and their clients.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-12 lg:grid-cols-3">
              <div className="grid gap-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-2">
                  <Camera className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">1. Create an Event</h3>
                <p className="text-muted-foreground">
                  Studios connect their Google Drive, select a folder of event photos, and generate a unique event page.
                </p>
              </div>
              <div className="grid gap-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-2">
                  <QrCode className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">2. Share with Clients</h3>
                <p className="text-muted-foreground">
                  Clients access the event page by scanning a simple QR code provided by the studio. No apps, no logins.
                </p>
              </div>
              <div className="grid gap-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-2">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold font-headline">3. Find with AI</h3>
                <p className="text-muted-foreground">
                  Clients upload a selfie, and our AI instantly finds and displays all their photos from the event.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-20 md:py-28 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Flexible Pricing for Every Studio</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose a plan that works for you. Cancel anytime.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-4xl items-stretch gap-8 py-16 md:grid-cols-2">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Pay Per Event</CardTitle>
                  <CardDescription>Perfect for one-off events or trying out our service.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-muted-foreground">/ event</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Single Event</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Up to 2,000 photos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>AI-powered photo matching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>QR code and event link</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/login">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col border-primary shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Monthly Plan</CardTitle>
                  <CardDescription>Best value for busy studios with multiple events.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-muted-foreground">/ month</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Unlimited Events</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Unlimited Photos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>AI-powered photo matching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>Priority Support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="accent">
                    <Link href="/login">Choose Plan</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="w-full py-20 md:py-28 bg-card">
          <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Our Work</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Capturing moments that last a lifetime. Here's a glimpse of what we do.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {portfolioImages.map((image) => (
                <Card key={image.id} className="overflow-hidden group">
                  <CardContent className="p-0">
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      data-ai-hint={image.imageHint}
                      width={800}
                      height={600}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
               <div className="flex items-center justify-center">
                 <Image
                    src={portfolioImages[1]?.imageUrl || "https://picsum.photos/seed/about/800/800"}
                    alt="About Us"
                    data-ai-hint={portfolioImages[1]?.imageHint || "camera equipment"}
                    width={800}
                    height={800}
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                  />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">About StudioMatch</h2>
                <p className="text-muted-foreground">
                  StudioMatch was born from a simple idea: finding your photos should be as joyful as the moment they were taken. For too long, clients have had to scroll through endless galleries, and studios have spent hours searching for specific shots.
                </p>
                <p className="mt-4 text-muted-foreground">
                  We bridge this gap with powerful, user-friendly AI. Our platform empowers photography studios to provide an exceptional, modern service that clients will love. We handle the tech, so you can focus on what you do best: creating beautiful images.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
