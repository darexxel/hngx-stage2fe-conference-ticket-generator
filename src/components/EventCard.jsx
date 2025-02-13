// src/components/EventCard.jsx
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="bg-custom-dark3 rounded-lg overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 bg-custom-dark4"></div>
      <div className="p-6">
        <h2 className="text-2xl text-white font-roadrage mb-2">{event.title}</h2>
        <div className="text-custom-gray1 space-y-2 mb-4">
          <p>📅 {event.date} | {event.time}</p>
          <p>📍 {event.location}</p>
          <p>💰 {event.price}</p>
        </div>
        <Link
          to={`/select-tickets/${event.id}`}
          className="block text-center bg-custom-blue2 text-white py-2 px-4 rounded"
        >
          Get Tickets
        </Link>
      </div>
    </div>
  );
};

export default EventCard;