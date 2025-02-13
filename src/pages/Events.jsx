// Events.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Events = () => {
    const [selectedTicket, setSelectedTicket] = useState('free');
    const [ticketCount, setTicketCount] = useState(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [errors, setErrors] = useState({}); // Add error state
    const navigate = useNavigate();

    const ticketTypes = [
        { id: 'free', name: 'Free', price: 'Free', access: 'Regular Access', available: '20/52' },
        { id: 'vip', name: 'VIP', price: '$150', access: 'VIP Access', available: '20/52' },
        { id: 'vvip', name: 'VVIP', price: '$150', access: 'VVIP Access', available: '20/52' },
    ];

    const ticketQuantities = Array.from({ length: 10 }, (_, i) => i + 1);

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedEventData = localStorage.getItem('eventData');
        if (savedEventData) {
            const parsedData = JSON.parse(savedEventData);
            setSelectedTicket(parsedData.selectedTicket || 'free');
            setTicketCount(parsedData.ticketCount || 1);
        }
    }, []);

    // Save data to localStorage whenever selectedTicket or ticketCount changes
    useEffect(() => {
        localStorage.setItem('eventData', JSON.stringify({
            selectedTicket,
            ticketCount,
        }));
    }, [selectedTicket, ticketCount]);

    const handleNext = () => {
        const newErrors = {};

        if (!selectedTicket) {
            newErrors.selectedTicket = 'Please select a ticket type.';
        }
        if (ticketCount <= 0) {
            newErrors.ticketCount = 'Please select a valid number of tickets.';
        }
        setErrors(newErrors)

        // If there are errors, prevent navigation
        if (Object.keys(newErrors).length > 0) {
            return;
        }
       // Clear local storage
       localStorage.removeItem("eventData")
        navigate('/attendee-details', { state: { selectedTicket, ticketCount } }); // PASS DATA HERE
    };

    const handleTicketTypeClick = (ticketId) => {
      setSelectedTicket(ticketId);
      // Clear the selectedTicket error if it exists, when a user click
      if(errors.selectedTicket){
        setErrors(prevErrors => ({...prevErrors, selectedTicket: null}))
      }
    }
     const handleTicketCountClick = (num) => {
        setTicketCount(num);
        setIsDropdownOpen(false);
         // Clear the ticketCount error if it exists
         if(errors.ticketCount) {
            setErrors(prevErrors => ({ ...prevErrors, ticketCount: null }));
        }
    }



    return (
        <div className="max-w-[700px] min-h-[858px] p-4 sm:p-8 lg:p-12 bg-custom-dark2 rounded-2xl sm:rounded-[40px] border border-custom-dark7 flex flex-col justify-center items-center gap-6 sm:gap-8 mx-auto mt-4 sm:mt-10">
            {/* Title and Step Indicator */}
            <div className="w-full flex flex-col gap-3">
                <div className="flex justify-between items-center">
                    <div className="text-white text-2xl sm:text-[32px] font-secondary-custom">Ticket Selection</div>
                    <div className="text-neutral-50 text-sm sm:text-base font-normal">Step 1/3</div>
                </div>
                <div className="relative h-1 bg-custom-dark7 rounded-full">
                    <div className="absolute left-0 top-0 h-1 bg-custom-blue2 rounded-full w-1/3"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full p-4 sm:p-6 bg-custom-dark5 rounded-2xl sm:rounded-[32px] border border-custom-dark8 flex flex-col gap-6 sm:gap-8">
                {/* Event Banner */}
                <div className="w-full p-4 sm:p-6 vertical-gradient-background rounded-2xl sm:rounded-3xl border-l-2 border-r-2 border-b-2 border-custom-dark4 backdrop-blur-[14px] flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center gap-2">
                        <div className="text-center text-neutral-50 text-4xl sm:text-[62px] font-special-custom leading-tight">Techember Fest "25</div>
                        <div className="max-w-[340px] text-center text-neutral-50 text-sm sm:text-base">Join us for an unforgettable experience at [Event Name]! Secure your spot now.</div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base text-neutral-50">
                        <div>📍 [Event Location]</div>
                        <div className="hidden sm:block">| |</div>
                        <div>March 15, 2025 | 7:00 PM</div>
                    </div>
                </div>

                <div className="h-px bg-custom-dark4 w-full"></div>

                {/* Ticket Selection */}
                <div className="flex flex-col gap-2">
                    <div className="text-neutral-50 text-sm sm:text-base">Select Ticket Type:</div>
                      {/* Error Message */}
                    {errors.selectedTicket && <div className="text-red-500 text-sm">{errors.selectedTicket}</div>}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-custom-dark3 rounded-2xl sm:rounded-3xl border border-custom-dark4">
                        {ticketTypes.map((ticket) => (
                           <button
                            key={ticket.id}
                            onClick={() => handleTicketTypeClick(ticket.id)}
                            className={`p-3 rounded-xl border ${
                                selectedTicket === ticket.id
                                    ? 'bg-custom-dark8 border-custom-blue1'
                                    : 'border-custom-blue1 hover:bg-custom-dark8/50'
                            } transition-colors duration-200 flex flex-col items-start focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                                <div className="text-white text-xl sm:text-2xl font-semibold text-left">{ticket.price}</div>
                                <div className="mt-2 text-left">
                                    <div className="text-neutral-50 text-sm sm:text-base whitespace-nowrap">{ticket.access}</div>
                                    <div className="text-custom-gray1 text-xs sm:text-sm">{ticket.available}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Ticket Quantity */}
                <div className="flex flex-col gap-2">
                    <div className="text-neutral-50 text-sm sm:text-base">Number of Tickets</div>
                    {/* Error Message */}
                     {errors.ticketCount && <div className="text-red-500 text-sm">{errors.ticketCount}</div>}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full p-3 rounded-xl border border-custom-dark4 bg-custom-dark3 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <span className="text-white">{ticketCount}</span>
                            <ChevronDown className={`w-5 h-5 text-white transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 w-full mt-1 bg-custom-dark3 border border-custom-dark4 rounded-xl max-h-48 overflow-y-auto z-10">
                                {ticketQuantities.map((num) => (
                                   <button
                                    key={num}
                                    onClick={() => handleTicketCountClick(num)}
                                    className="w-full p-3 text-left text-white hover:bg-custom-dark8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6">
                <button className="w-full h-12 px-6 py-3 rounded-lg border border-custom-blue2 text-custom-blue2 font-secondary-custom focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Cancel
                </button>
                <button
                    className="w-full h-12 px-6 py-3 bg-custom-blue2 rounded-lg text-white font-secondary-custom focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Events;