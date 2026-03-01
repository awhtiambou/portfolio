import type { Metadata } from "next";
import { BlogListing } from "./BlogListing";

export const metadata: Metadata = {
    title: "Blog",
    description: "Articles, tutorials, and insights about AI/ML, computer vision, and software engineering.",
};

export default function BlogPage() {
    return (
        <main className="pt-28 md:pt-32">
            <BlogListing />
        </main>
    );
}
