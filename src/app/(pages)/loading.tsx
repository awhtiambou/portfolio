import { AnimatedLoading } from "@/components/ui/AnimatedLoading";

export default function PagesLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background pt-20">
            <AnimatedLoading size="lg" text="Loading..." />
        </div>
    );
}
