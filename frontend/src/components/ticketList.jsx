import { useState, useMemo } from "react";
import TicketCard from "./ticketCard";
import { Search, XCircle } from "lucide-react"; // Using lucide-react for icons

const TicketSkeleton = () => (
    <div className="bg-base-100 p-4 rounded-lg shadow-md animate-pulse">
        <div className="h-5 bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-700 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6 mb-4"></div>
        <div className="flex justify-between items-center">
            <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
            <div className="h-4 w-32 bg-gray-700 rounded"></div>
        </div>
    </div>
);


export default function TicketList({ tickets, loading }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
  console.log(tickets);
    const filteredTickets = useMemo(() => {
        return tickets
            .filter(ticket => {
                if (filterStatus === "All") return true;
                return ticket.status === filterStatus;
            })
            .filter(ticket =>
                ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [tickets, searchTerm, filterStatus]);

    const statusFilters = ["All", "TODO", "IN_PROGRESS", "Closed"];

    return (
        <div>
            {/* Header with Search and Filters */}
            <div className="mb-6 p-4 bg-base-100 rounded-xl shadow-lg">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                     <div className="form-control w-full sm:max-w-xs">
                         <label className="input input-bordered flex items-center gap-2">
                             <Search className="w-4 h-4 opacity-70"/>
                             <input type="text" className="grow" placeholder="Search tickets..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                         </label>
                    </div>
                    <div className="tabs tabs-boxed">
                        {statusFilters.map(status => (
                             <a key={status} className={`tab ${filterStatus === status ? 'tab-active' : ''}`} onClick={() => setFilterStatus(status)}>{status}</a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tickets Grid */}
            <div className="space-y-7">
                {loading && tickets.length === 0 ? (
                    Array.from({ length: 3 }).map((_, i) => <TicketSkeleton key={i} />)
                ) : filteredTickets.length > 0 ? (
                    filteredTickets.map(ticket => (
                        <TicketCard key={ticket._id} ticket={ticket} />
                    ))
                ) : (
                    <div className="text-center py-16 bg-base-100 rounded-lg shadow-md">
                        <XCircle className="mx-auto h-12 w-12 text-gray-500"/>
                        <h3 className="mt-2 text-xl font-semibold">No Tickets Found</h3>
                        <p className="mt-1 text-base text-gray-400">
                            No tickets match your current filters.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}