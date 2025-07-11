import { Link } from "react-router";
import { Calendar, ChevronsRight, ShieldAlert, ShieldCheck, Shield } from "lucide-react";

// Helper to determine badge colors and icons
const getPriorityProps = (priority) => {
    switch (priority) {
        case 'High': return { color: 'badge-error', Icon: ShieldAlert };
        case 'Medium': return { color: 'badge-warning', Icon: Shield };
        default: return { color: 'badge-info', Icon: ShieldCheck };
    }
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Open': return 'badge-success';
        case 'In Progress': return 'badge-primary';
        case 'Closed': return 'badge-neutral';
        default: return 'badge-ghost';
    }
}


export default function TicketCard({ ticket }) {
    const { color: priorityColor, Icon: PriorityIcon } = getPriorityProps(ticket.priority);

    return (
        <Link to={`/tickets/${ticket._id}`}>
            <div className="card bg-base-100 mb-4 shadow-md p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-l-4 border-transparent hover:border-primary">
                {/* Card Header */}
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-base-content">{ticket.title}</h3>
                    <div className={`badge ${getStatusColor(ticket.status)} font-semibold`}>
                        {ticket.status}
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-base-content/70 mb-4 line-clamp-2">
                    {ticket.description}
                </p>

                {/* Card Footer */}
                <div className="flex flex-wrap gap-4 justify-between items-center text-xs text-base-content/60">
                    <div className={`badge ${priorityColor} badge-outline gap-1`}>
                        <PriorityIcon className="w-3 h-3" />
                        {ticket.priority} Priority
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}