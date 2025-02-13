// src/pages/TicketSelection.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TicketSelection = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  const ticketTypes = [
    { type: 'Regular Access', price: 'Free', available: '20/52' },
    { type: 'VIP Access', price: '$150', available: '20/52' },
    { type: 'VVIP Access', price: '$150', available: '20/52' }
  ];

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl bg-custom-dark3 rounded-lg p-8">
        <h1 className="text-white text-[32px] font-jeju">Ticket Selection</h1>
        {/* Rest of your ticket selection UI */}
      </div>
    </div>
  );
};

export default TicketSelection;