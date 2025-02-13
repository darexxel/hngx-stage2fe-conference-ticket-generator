
// src/components/TicketCard.jsx
const TicketCard = ({ ticket }) => {
    return (
      <div className="bg-custom-dark3 rounded-lg p-6">
        <h3 className="text-white text-2xl font-semibold font-roboto">
          {ticket.price}
        </h3>
        <p className="text-neutral-50 text-base font-roboto uppercase">
          {ticket.type}
        </p>
        <p className="text-custom-gray1 text-sm font-roboto">
          {ticket.available}
        </p>
      </div>
    );
  };
  
  export default TicketCard;