import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import useTicket from "../hooks/useTicket";
import Navbar from "../components/navbar";
import TicketDetailsSkeleton from "../components/skeleton/ticketDetailsSkeleton";
import { ArrowLeft, BrainCircuit } from 'lucide-react';
import ActivityFeed from "../components/activitycard";

const AILoadingIndicator = ({ text }) => (
    <div className="flex items-center gap-2 text-sm text-base-content/60 p-2 bg-base-200 rounded-lg">
        <span className="loading loading-dots loading-sm"></span>
        <span>{text}</span>
    </div>
);


const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'Open': return 'badge-success';
        case 'In Progress': return 'badge-primary';
        case 'Closed': return 'badge-neutral text-base-content/60';
        default: return 'badge-ghost';
    }
};

const getPriorityBadgeClass = (priority) => {
    switch (priority) {
        case 'High': return 'badge-error';
        case 'Medium': return 'badge-warning';
        default: return 'badge-info';
    }
};

export default function TicketDetails() {
    const { ticket, loading, error } = useTicket();

    if (loading) return (
        <>
            <Navbar />
            <TicketDetailsSkeleton />
        </>
    );
    console.log(ticket, error);
    if (error || !ticket) return (
        <>
            <Navbar />
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold mb-2">{error ? "An Error Occurred" : "Ticket Not Found"}</h2>
                <p className="text-base-content/70">{error ? "Could not load the ticket details." : "Please check the ticket ID and try again."}</p>
                <Link to="/tickets" className="btn btn-primary mt-6">
                    Back to All Tickets
                </Link>
            </div>
        </>
    );

    return (
        <>
            <Navbar />
            <main className="max-w-6xl mx-auto p-4 lg:p-8">

                <div className="flex justify-between items-center mb-6">
                    <Link to="/" className="flex items-center gap-2 text-sm hover:text-primary mt-3 transition-colors">
                        <ArrowLeft size={20} />
                        Back to All Tickets
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    <div className="lg:col-span-2 bg-base-100 p-6 rounded-2xl shadow-lg">
                        <h1 className="text-3xl font-extrabold mb-4 text-base-content tracking-tight">{ticket.title}</h1>
                        <p className="text-base-content/80 leading-relaxed">
                            {ticket.description}
                        </p>

                        <div className="mt-8">
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <BrainCircuit size={20} className="text-primary" />
                                AI Generated Notes
                            </h3>
                            {ticket.helpfulNotes === "" ? (
                                <AILoadingIndicator text="Gemini is analyzing the ticket..." />
                            ) : ticket.helpfulNotes ? (
                                <div className="prose prose-sm max-w-none bg-base-200 p-4 rounded-lg">
                                    <ReactMarkdown>{ticket.helpfulNotes}</ReactMarkdown>
                                </div>
                            ) : (
                                <p className="text-sm text-base-content/60 italic">No helpful notes available.</p>
                            )}
                        </div>

                        <div className="mt-10">
                            <ActivityFeed ticket={ticket} />
                        </div>
                    </div>


                    <aside className="lg:col-span-1 sticky top-8">
                        <div className="bg-base-100 p-6 rounded-2xl shadow-lg space-y-5">
                            <h3 className="font-bold text-lg">Details</h3>

                            <div className="flex justify-between items-center">
                                <span className="font-medium text-sm text-base-content/70">Status</span>
                                <span className={`badge ${getStatusBadgeClass(ticket.status)} font-semibold`}>
                                    {ticket.status}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="font-medium text-sm text-base-content/70">Priority</span>
                                <span className={`badge ${getPriorityBadgeClass(ticket.priority)} font-semibold`}>
                                    {ticket.priority}
                                </span>
                            </div>

                            {ticket.assignedTo && (
                                <div className="space-y-2">
                                    <span className="font-medium text-sm text-base-content/70">Assigned To</span>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={`https://i.pravatar.cc/40?u=${ticket.assignedTo.email}`} alt="avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm">{ticket.assignedTo.name || 'User'}</p>
                                            <p className="text-xs text-base-content/60">{ticket.assignedTo.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- MODIFIED Related Skills Section --- */}
                            <div className="space-y-2">
                                <span className="font-medium text-sm text-base-content/70">Related Skills</span>
                                {ticket.relatedSkills === "" ? (
                                    <AILoadingIndicator text="Finding skills..." />
                                ) : ticket.relatedSkills?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {ticket.relatedSkills.map(skill => (
                                            <div key={skill} className="badge badge-outline">{skill}</div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-base-content/60 italic">None identified.</p>
                                )}
                            </div>


                            <div className="border-t border-base-content/10 pt-4 space-y-2 text-xs text-base-content/60">
                                <div className="flex justify-between">
                                    <span>Created:</span>
                                    <span>{new Date(ticket.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Updated:</span>
                                    <span>{new Date(ticket.updatedAt || ticket.createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </>
    );
}