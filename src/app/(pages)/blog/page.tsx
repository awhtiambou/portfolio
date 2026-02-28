import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";

export const metadata: Metadata = {
    title: "Blog",
    description: "Articles, tutorials, and insights about AI/ML, software development, and technology.",
};

export default function BlogPage() {
    return (
        <>
            <Header />
            <main className="pt-24 min-h-screen">
                <div className="container max-w-4xl mx-auto px-4 py-16">
                    {/* Hero */}
                    <div className="text-center mb-16">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
                            Blog
                        </h1>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                            Articles, tutorials, and insights about AI/ML, software development, and technology.
                        </p>
                    </div>

                    {/* Coming Soon Message */}
                    <div className="bg-background-secondary rounded-2xl p-12 text-center">
                        <span className="text-6xl mb-6 block">✍️</span>
                        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
                            Coming Soon
                        </h2>
                        <p className="text-text-secondary max-w-md mx-auto mb-8">
                            I&apos;m working on some exciting content about AI, machine learning,
                            and software engineering. Check back soon!
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <span className="px-4 py-2 bg-accent-blue/10 text-accent-blue rounded-full text-sm font-medium">
                                AI/ML Tutorials
                            </span>
                            <span className="px-4 py-2 bg-accent-pink/10 text-accent-pink rounded-full text-sm font-medium">
                                Tech Deep Dives
                            </span>
                            <span className="px-4 py-2 bg-accent-mint/10 text-accent-mint rounded-full text-sm font-medium">
                                Project Breakdowns
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
