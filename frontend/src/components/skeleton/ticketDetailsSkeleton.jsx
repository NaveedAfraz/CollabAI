

export default function TicketDetailsSkeleton() {
    return (
        <div className="max-w-6xl mx-auto p-4 lg:p-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="h-8 bg-base-content/10 rounded w-1/4 mb-6"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Skeleton */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="h-10 bg-base-content/20 rounded w-3/4"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-base-content/10 rounded w-full"></div>
                        <div className="h-4 bg-base-content/10 rounded w-full"></div>
                        <div className="h-4 bg-base-content/10 rounded w-5/6"></div>
                    </div>
                    <div className="pt-4">
                        <div className="h-6 bg-base-content/20 rounded w-1/3 mb-4"></div>
                        <div className="h-24 bg-base-100 rounded-lg"></div>
                    </div>
                </div>

                {/* Sidebar Skeleton */}
                <div className="lg:col-span-1">
                    <div className="bg-base-100/60 p-5 rounded-xl space-y-5">
                        <div className="h-6 bg-base-content/20 rounded w-1/2"></div>
                        <div className="h-8 bg-base-content/10 rounded"></div>
                        <div className="h-8 bg-base-content/10 rounded"></div>
                        <div className="h-12 bg-base-content/10 rounded"></div>
                        <div className="h-16 bg-base-content/10 rounded"></div>
                    </div>
                </div>
            </div>
        </div>

    );
}