
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function SubscribePage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background p-4 sm:px-6 lg:px-8">
       <div className="absolute top-8 left-8">
         <Logo />
       </div>
       <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Choose Your Plan</h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Select a plan to continue to your dashboard.
            </p>
            </div>
        </div>
        <div className="mx-auto grid items-start gap-8 md:grid-cols-2">
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
    </div>
  );
}
