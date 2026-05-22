import * as React from "react";

export interface AutoSkeletonProps {
    children: React.ReactNode;

    loading?: boolean;

    animation?:
        | "shimmer"
        | "pulse"
        | "wave"
        | "none";

    duration?: number;

    theme?: "light" | "dark";
}

export declare function AutoSkeleton(
    props: AutoSkeletonProps
): React.JSX.Element;