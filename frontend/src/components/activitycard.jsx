import { MessageSquare } from 'lucide-react';

export default function ActivityFeed({ ticket }) {
    // Directly create a simple list of known activities.
    const activities = [];

    // 1. The ticket was created. This is always true.
    activities.push({
        id: 1,
        actor: 'System',
        action: <p>Ticket was created.</p>,
        timestamp: new Date(ticket.createdAt),
    });

    // 2. The ticket was assigned (only if assignment data exists).
    if (ticket.assignedTo) {
        activities.push({
            id: 2,
            actor: 'System',
            action: (
                <p>
                    Assigned ticket to{' '}
                    <span className="font-bold">{ticket.assignedTo.email}</span>.
                </p>
            ),
            // We assume assignment happens at or after creation.
            // For simplicity, we use the creation timestamp.
            timestamp: new Date(ticket.createdAt),
        });
    }

    // Sort events to show the most recent first.
    const sortedActivities = activities.sort((a, b) => b.timestamp - a.timestamp);

    return (
        <div className="mt-10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MessageSquare size={20} />
                Activity
            </h3>
            <div className="space-y-4">
                {sortedActivities.map((activity) => (
                    <div key={activity.id} className="p-4 bg-base-200 rounded-lg text-sm">
                        <p className="font-semibold">{activity.actor}</p>
                        <div className="text-base-content/70">{activity.action}</div>
                        <p className="text-xs text-base-content/50 mt-1">
                            {activity.timestamp.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}