import { AnimatedLoading } from "@/components/ui/AnimatedLoading";

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <AnimatedLoading size="lg" text="Loading..." />
        </div>
    );
}
