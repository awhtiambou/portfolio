"use client";

import Link from "next/link";
import { useTransition } from "@/providers/TransitionContext";
import { ComponentProps } from "react";

type TransitionLinkProps = ComponentProps<typeof Link>;

export function TransitionLink({ href, onClick, children, ...props }: TransitionLinkProps) {
    const { triggerTransition } = useTransition();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const url = typeof href === "string" ? href : href.pathname ?? "/";

        // skip transition for external links, anchors, and modified clicks
        if (
            url.startsWith("http") ||
            url.startsWith("#") ||
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey
        ) {
            onClick?.(e);
            return;
        }

        e.preventDefault();
        triggerTransition(url);
        onClick?.(e);
    };

    return (
        <Link href={href} onClick={handleClick} {...props}>
            {children}
        </Link>
    );
}
