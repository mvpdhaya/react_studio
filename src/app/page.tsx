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
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
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
                priority
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-28 lg:py-32">
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
            <div className="mx-auto grid max-w-5xl items-center gap-y-16">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <Image
                        src="https://picsum.photos/seed/feature1/800/600"
                        alt="Create Event"
                        data-ai-hint="photographer laptop"
                        width={800}
                        height={600}
                        className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover"
                    />
                    <div className="space-y-4">
                         <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Camera className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold font-headline">1. Create an Event</h3>
                        </div>
                        <p className="text-muted-foreground md:text-lg">
                        Studios connect their Google Drive, select a folder of event photos, and generate a unique event page with a shareable QR code.
                        </p>
                    </div>
                </div>
                 <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <div className="space-y-4 md:order-last">
                         <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <QrCode className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold font-headline">2. Share with Clients</h3>
                        </div>
                        <p className="text-muted-foreground md:text-lg">
                        Clients access the event page by scanning a simple QR code provided by the studio. No apps, no logins, just instant access.
                        </p>
                    </div>
                    <Image
                        src="https://picsum.photos/seed/feature2/800/600"
                        alt="Share QR Code"
                        data-ai-hint="phone qr code"
                        width={800}
                        height={600}
                        className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover"
                    />
                </div>
                 <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <Image
                        src="https://picsum.photos/seed/feature3/800/600"
                        alt="Find with AI"
                        data-ai-hint="woman phone selfie"
                        width={800}
                        height={600}
                        className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover"
                    />
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold font-headline">3. Find with AI</h3>
                        </div>
                        <p className="text-muted-foreground md:text-lg">
                        Clients upload a selfie, and our AI instantly finds and displays all their photos from the event for easy viewing and downloading.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-20 md:py-28 lg:py-32 bg-muted">
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
                <CardHeader className="pb-4">
                  <CardTitle className="font-headline text-2xl">Pay Per Event</CardTitle>
                  <CardDescription>Perfect for one-off events or trying out our service.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-muted-foreground">/ event</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm">
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
                <CardHeader className="pb-4">
                  <CardTitle className="font-headline text-2xl">Monthly Plan</CardTitle>
                  <CardDescription>Best value for busy studios with multiple events.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-muted-foreground">/ month</span>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm">
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
        <section className="w-full py-20 md:py-28 lg:py-32 bg-card">
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
        <section id="about" className="w-full py-20 md:py-28 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
               <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">About Us</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">About StudioMatch</h2>
                <p className="text-muted-foreground md:text-lg">
                  StudioMatch was born from a simple idea: finding your photos should be as joyful as the moment they were taken. For too long, clients have had to scroll through endless galleries, and studios have spent hours searching for specific shots.
                </p>
                <p className="mt-4 text-muted-foreground md:text-lg">
                  We bridge this gap with powerful, user-friendly AI. Our platform empowers photography studios to provide an exceptional, modern service that clients will love. We handle the tech, so you can focus on what you do best: creating beautiful images.
                </p>
              </div>
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
