'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Camera, QrCode, Sparkles, Check, Bot, Zap, ShieldCheck } from 'lucide-react';

const features = [
    {
        icon: Zap,
        title: "Instant AI Matching",
        description: "Clients upload a selfie and our AI instantly finds their photos from thousands in seconds."
    },
    {
        icon: QrCode,
        title: "Simple QR Code Access",
        description: "Generate a unique QR code for each event. Clients scan it to access their photos—no apps needed."
    },
    {
        icon: Bot,
        title: "Automated for Studios",
        description: "Connect your Google Drive and let the system handle the rest. Spend more time shooting, less time sorting."
    }
];

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col justify-center items-center space-y-6">
                 <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-sans bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
                  Your Photos, Found Instantly.
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  StudioMatch uses AI to help your clients find their photos from any event with just a selfie. Effortless for them, automated for you.
                </p>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">Get Started for Free</Link>
                  </Button>
                   <Button asChild size="lg" variant="outline">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-28 lg:py-32 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-primary/10 border border-primary/20 px-3 py-1 text-sm text-primary font-medium">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">The Future of Photo Delivery</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A seamless experience for both photography studios and their clients.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center text-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20 text-primary">
                            <feature.icon className="h-8 w-8" />
                        </div>
                        <div className="space-y-2">
                             <h3 className="text-xl font-bold">{feature.title}</h3>
                             <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </section>
        
        {/* How it works */}
        <section id="how-it-works" className="w-full py-20 md:py-28 lg:py-32">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works in 3 Steps</h2>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-y-16">
                    <div className="grid gap-10 md:grid-cols-2 md:items-center">
                        <div className="space-y-4">
                             <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">1</div>
                                <h3 className="text-2xl font-bold">Create an Event</h3>
                            </div>
                            <p className="text-muted-foreground md:text-lg">
                            Studios connect their Google Drive, select a folder of event photos, and generate a unique event page with a shareable QR code.
                            </p>
                        </div>
                        <Image
                            src="https://picsum.photos/seed/feature1/800/600"
                            alt="Create Event"
                            data-ai-hint="photographer laptop"
                            width={800}
                            height={600}
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                        />
                    </div>
                     <div className="grid gap-10 md:grid-cols-2 md:items-center">
                        <div className="space-y-4 md:order-last">
                             <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">2</div>
                                <h3 className="text-2xl font-bold">Share with Clients</h3>
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
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                        />
                    </div>
                     <div className="grid gap-10 md:grid-cols-2 md:items-center">
                        <Image
                            src="https://picsum.photos/seed/feature3/800/600"
                            alt="Find with AI"
                            data-ai-hint="woman phone selfie"
                            width={800}
                            height={600}
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                        />
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">3</div>
                                <h3 className="text-2xl font-bold">Find with AI</h3>
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
        <section id="pricing" className="w-full py-20 md:py-28 lg:py-32 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                 <div className="inline-block rounded-lg bg-primary/10 border border-primary/20 px-3 py-1 text-sm text-primary font-medium">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Flexible Pricing for Every Studio</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose a plan that works for you. Cancel anytime.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-4xl items-start gap-8 py-16 md:grid-cols-2">
              <Card className="flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">Pay Per Event</CardTitle>
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
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/dashboard">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col border-primary ring-2 ring-primary shadow-2xl">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">Monthly Plan</CardTitle>
                    <div className="inline-block rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground font-medium">Most Popular</div>
                  </div>
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
                  <Button asChild className="w-full">
                    <Link href="/dashboard">Choose Plan</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
