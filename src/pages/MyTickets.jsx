// src/pages/MyTickets.jsx
import { Link } from 'react-router-dom';

const MyTickets = () => {
  const tickets = [
    {
      id: 1,
      eventTitle: "Techember Fest '25",
      ticketType: "VIP Access",
      date: "March 15, 2025",
      time: "7:00 PM",
      location: "Tech Convention Center",
      status: "active"
    }
  ];

  if (tickets.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl text-white font-jeju mb-8">My Tickets</h1>
        <div className="bg-custom-dark3 rounded-lg p-8">
          <p className="text-neutral-50 mb-4">You haven't purchased any tickets yet.</p>
          <Link 
            to="/" 
            className="inline-block bg-custom-blue2 text-white px-6 py-2 rounded"
          >
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl text-white font-jeju mb-8">My Tickets</h1>
      <div className="space-y-4">
        {tickets.map(ticket => (
          <div key={ticket.id} className="bg-custom-dark3 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl text-white font-roadrage mb-2">
                  {ticket.eventTitle}
                </h2>
                <div className="text-neutral-50 space-y-2">
                  <p>🎟️ {ticket.ticketType}</p>
                  <p>📅 {ticket.date} | {ticket.time}</p>
                  <p>📍 {ticket.location}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-custom-blue2 text-white rounded-full text-sm">
                {ticket.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;