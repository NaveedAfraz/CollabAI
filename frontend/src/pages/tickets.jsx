import { useState } from "react";
import useTickets from "../hooks/useTickets";
import Navbar from "../components/navbar";
import CreateTicketForm from "../components/createTicketForm";
import TicketList from "../components/ticketList";

export default function Tickets() {
    const { form, handleChange, handleSubmit, tickets, loading } = useTickets();

    return (
        <>
            <Navbar />
            <main className="mx-auto p-4 lg:p-8 bg-base-300 w-[100%] min-h-screen">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-[100%]">
                    {/* Column 1: Create Ticket Form */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-8 w-[100%]">
                           <CreateTicketForm
                                form={form}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                loading={loading}
                           />
                        </div>
                    </aside>

                    {/* Column 2: Tickets List */}
                    <section className="lg:col-span-2">
                        <TicketList tickets={tickets} loading={loading} />
                    </section>
                </div>
            </main>
        </>
    );
}