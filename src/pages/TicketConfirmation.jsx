// TicketConfirmation.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TicketConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Destructure ALL the data
    const { name, email, specialRequest, profilePhoto, selectedTicket, ticketCount } = location.state || {};

      const ticketTypes = [
        { id: 'free', name: 'Free', price: 'Free', access: 'Regular Access', available: '20/52' },
        { id: 'vip', name: 'VIP', price: '$150', access: 'VIP Access', available: '20/52' },
        { id: 'vvip', name: 'VVIP', price: '$150', access: 'VVIP Access', available: '20/52' },
    ];
    // Helper function to get ticket type name
    const getTicketTypeName = (ticketId) => {
        const ticket = ticketTypes.find(t => t.id === ticketId);
        return ticket ? ticket.name : 'Unknown'; // Handle cases where the ID might be invalid
    };

    React.useEffect(() => {
        if (!name || !email) {
            navigate('/');
        }
    }, [name, email, navigate]);

    if (!name || !email) {
        return null;
    }

      const handleBookAnotherTicket = () => {
      navigate("/");
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="w-full max-w-[700px] p-4 sm:p-8 lg:p-12 bg-custom-dark2 rounded-2xl sm:rounded-3xl border border-custom-dark7 flex flex-col items-center gap-6 sm:gap-8">
                {/* Step Indicator */}
                <div className="self-stretch flex flex-col items-start gap-3">
                    <div className="self-stretch flex justify-between items-center">
                        <div className="text-white text-2xl sm:text-3xl font-secondary-custom">Ready</div>
                        <div className="text-neutral-50 text-sm sm:text-base font-normal">Step 3/3</div>
                    </div>
                    <div className="relative w-full h-1 bg-custom-dark7 rounded-full">
                        <div className="absolute left-0 top-0 h-1 bg-custom-blue2 rounded-full w-full"></div>
                    </div>
                </div>

                {/* Confirmation Message */}
                <div className="self-stretch flex flex-col items-center gap-4 sm:gap-8">
                    <div className="self-stretch text-center text-white text-2xl sm:text-3xl font-special-custom">Your Ticket is Booked!</div>
                    <div className="self-stretch text-center text-neutral-50 text-sm sm:text-base font-normal">
                        Check your email for a copy or you can <span className="font-bold">download</span>
                    </div>

                    {/* Ticket Card - Ensure Visibility */}
                    <div className="self-stretch flex flex-col items-center gap-4 sm:gap-6">
                        <div className="self-stretch rounded-3xl flex flex-col items-center">
                            <div className='ticket'>
                                <div className="ticket-inner w-full sm:w-[300px] relative overflow-hidden bg-[#072c31] rounded-t-3xl">
                                    {/* Corner cutouts */}
                                    <div class="corner top-left"></div>
                                    <div class="corner top-right"></div>
                                    <div class="corner bottom-left"></div>
                                    <div class="corner bottom-right"></div>

                                    {/* ONLY THIS LINE CHANGED - Removed backdrop-blur-sm */}
                                    <div className="absolute inset-0 bg-[#031d21]/10"></div>

                                    <div className="mx-2 sm:mx-4 py-2 my-2 sm:my-4 border-[#23a0b5] border rounded-2xl sm:rounded-3xl flex flex-col items-center gap-3 sm:gap-5">
                                       <div className=" flex flex-col justify-start items-center">
                                            <div className="self-stretch text-center text-white text-[34px] font-normal font-special-custom leading-[34px]">Techember Fest "25</div>
                                            <div className="p-1 flex flex-col justify-center items-center gap-1">
                                                <div className="text-white text-[10px] font-normal font-display leading-[15px]">📍 04 Rumens road, Ikoyi, Lagos</div>
                                                <div className="text-white text-[10px] font-normal font-display leading-[15px]">📅 March 15, 2025 | 7:00 PM</div>
                                            </div>
                                        </div>
                                        <img className="w-[120px] sm:w-[140px] h-auto rounded-xl border-4 border-custom-blue1/50" src={profilePhoto} alt="User Avatar" />

                                        {/* Ticket Details - Restored Original Structure */}
                                        <div className="mx-2 p-1 bg-[#07333c] rounded-lg border border-[#123d43] flex flex-col justify-center items-center">
                                            <div className="self-stretch border-b border-[#12464e] flex justify-start items-center gap-2">
                                                <div className="grow shrink basis-0 p-1 border-r border-[#12464e] flex flex-col justify-center items-start gap-1">
                                                    <div className="opacity-30 text-white text-[10px] font-normal font-display leading-[15px]">Enter your name</div>
                                                  <div className="text-white text-xs font-bold font-display leading-[18px]">{name}</div>
                                                </div>
                                                <div className="grow shrink basis-0 p-1 flex flex-col justify-center items-start gap-1">
                                                    <div className="opacity-30 text-white text-[10px] font-normal font-display leading-[15px]">Enter your email *</div>
                                                    <div className="text-white text-xs font-bold font-display leading-[18px]">{email}</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch border-b border-[#12464e] flex justify-start items-center gap-2">
                                                <div className="grow shrink basis-0 p-1 border-r border-[#12464e] flex flex-col justify-center items-start gap-1">
                                                    <div className="opacity-30 text-white text-[10px] font-normal font-display leading-[15px]">Ticket Type:</div>
                                                    {/* Use the helper function */}
                                                   <div className="text-white text-[10px]">{getTicketTypeName(selectedTicket)}</div>
                                                </div>
                                                <div className="grow shrink basis-0 p-1 flex flex-col justify-center items-start gap-1">
                                                    <div className="opacity-30 text-white text-[10px] font-normal font-display leading-[15px]">Ticket for :</div>
                                                   <div className="text-white text-[10px]">{ticketCount}</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch  p-2 flex flex-col justify-center items-start gap-1">
                                                <div className="self-stretch opacity-30 text-white text-[10px] font-normal font-display leading-[15px]">Special request?</div>
                                              <div className="self-stretch text-white text-[10px] font-normal font-display leading-[15px]">{specialRequest || "N/A"}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Barcode - Only Centering Applied */}
                            <div className='ticket'>
                                <div className="ticket-inner w-full sm:w-[300px] h-[80px] sm:h-[120px] relative overflow-hidden bg-[#072c31] rounded-b-3xl">
                                  <div class="corner top-left"></div>
                                    <div class="corner top-right"></div>
                                    <div class="corner bottom-left"></div>
                                    <div class="corner bottom-right"></div>
                                    <div className="flex justify-between items-center w-full h-full p-2 sm:p-8">
                                        {[3, 3, 10, 5, 3, 5, 3, 7, 4, 5, 3, 3, 3, 4, 3, 8, 3, 6, 6, 7, 3, 6, 5, 3, 3].map((width, index) => (
                                            <div key={index} className="bg-white h-full" style={{ width: `${width}px` }}></div>
                                        ))}
                                    </div>
                                    {/* Barcode Text - Centered */}
                                    <div className="absolute bottom-1 sm:bottom-3 left-2 sm:left-4 text-white text-[8px] sm:text-xs font-normal font-display">1</div>
                                    <div className="absolute bottom-1 sm:bottom-3 left-1/2 -translate-x-1/2 text-center text-white text-[8px] sm:text-xs font-normal font-display">234567891026</div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons - Corrected Layout */}
                       <div className="self-stretch flex flex-col sm:flex-row gap-4 sm:gap-6">
                            <button
                                onClick={handleBookAnotherTicket}
                                className="w-full sm:w-1/2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg border border-custom-blue2 text-custom-blue2 text-sm sm:text-base font-secondary-custom focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Book Another Ticket
                            </button>
                            <button
                                className="w-full sm:w-1/2 px-4 sm:px-6 py-2 sm:py-3 bg-custom-blue2 rounded-lg text-white text-sm sm:text-base font-secondary-custom focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Download Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketConfirmation;