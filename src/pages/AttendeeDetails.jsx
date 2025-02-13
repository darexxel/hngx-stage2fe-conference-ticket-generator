// AttendeeDetails.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

const AttendeeDetails = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Use a URL input
  const [errors, setErrors] = useState({}); // Store validation errors
  const navigate = useNavigate();
  const location = useLocation(); // Get location
  const { selectedTicket, ticketCount } = location.state || {}; // Get data from Events


  // Load data from localStorage on mount (keep this)
  useEffect(() => {
    const savedData = localStorage.getItem('attendeeDetails');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setName(parsedData.name || '');
      setEmail(parsedData.email || '');
      setSpecialRequest(parsedData.specialRequest || '');
      setImageUrl(parsedData.imageUrl || ''); // Load imageUrl
    }
  }, []);

  // Save data to localStorage whenever state changes (keep this)
  useEffect(() => {
    localStorage.setItem('attendeeDetails', JSON.stringify({
      name,
      email,
      specialRequest,
      imageUrl,
    }));
  }, [name, email, specialRequest, imageUrl]);

  const handleSubmit = () => {
    // Validation (keep this)
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    }
    // Add basic URL validation (can be improved)
    else if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      newErrors.imageUrl = "invalid url"
    }


    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Clear localStorage after successful submission
    localStorage.removeItem('attendeeDetails');

    // PASS ALL DATA TO TicketConfirmation
    navigate('/ticket-confirmation', {
      state: { name, email, specialRequest, profilePhoto: imageUrl, selectedTicket, ticketCount }
    });
  };

  return (
       <div className="max-w-[700px] min-h-[858px] p-4 sm:p-8 lg:p-12 bg-custom-dark2 rounded-2xl sm:rounded-[40px] border border-custom-dark7 flex flex-col justify-center items-center gap-6 sm:gap-8 mx-auto mt-4 sm:mt-10">
      {/* Title and Step Indicator */}
      <div className="w-full flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl sm:text-[32px] font-secondary-custom">Attendee Details</div>
          <div className="text-neutral-50 text-sm sm:text-base font-normal">Step 2/3</div>
        </div>
        <div className="relative h-1 bg-custom-dark7 rounded-full">
          <div className="absolute left-0 top-0 h-1 bg-custom-blue2 rounded-full w-2/3"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full p-4 sm:p-6 bg-custom-dark5 rounded-2xl sm:rounded-[32px] border border-custom-dark8 flex flex-col gap-6 sm:gap-8">
        {/* Upload Profile Photo (Simplified URL Input) */}
        <div className="flex flex-col gap-2 px-4 sm:px-6 pt-4 sm:pt-6 pb-8 sm:pb-12 bg-custom-dark4 rounded-2xl sm:rounded-3xl border border-custom-dark9">
          <div className="text-center text-neutral-50 text-sm sm:text-base font-normal">
            Enter Profile Photo URL
          </div>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-3 rounded-xl border border-custom-dark4 bg-custom-dark2 text-white"
            placeholder="Paste image URL here"
            id="imageUrl" // Add id for accessibility
          />
             {errors.imageUrl && <div className="text-red-500 text-sm">{errors.imageUrl}</div>}
        </div>

        <div className="h-px bg-custom-dark9 w-full"></div>

        {/* Enter Your Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-neutral-50 text-sm sm:text-base font-normal leading-normal">
            Enter your name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl border border-custom-dark4 bg-custom-dark2 text-white"
            id="name" // Add id for accessibility
          />
          {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
        </div>

        {/* Enter Your Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-neutral-50 text-sm sm:text-base font-normal leading-normal">
            Enter your email *
          </label>
          <div className="w-full p-3 rounded-xl border border-custom-dark4 bg-custom-dark2 flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6V6.511L12 12.734L4 6.512V6H20ZM4 18V9.044L11.386 14.789C11.5611 14.9265 11.7773 15.0013 12 15.0013C12.2227 15.0013 12.4389 14.9265 12.614 14.789L20 9.044L20.002 18H4Z"
                fill="white"
              />
            </svg>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow text-white bg-transparent outline-none"
              placeholder="hello@avioflagos.io"
              id="email" // Add id for accessibility
            />
          </div>
          {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
        </div>

        {/* Special Request */}
        <div className="flex flex-col gap-2">
          <label htmlFor="specialRequest" className="text-neutral-50 text-sm sm:text-base font-normal leading-normal">
            Special request?
          </label>
          <textarea
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            className="w-full h-32 p-3 rounded-xl border border-custom-dark4 bg-custom-dark2 text-custom-gray1"
            placeholder="Textarea"
            id="specialRequest" // Add id for accessibility
          ></textarea>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex gap-4 sm:gap-6">
        <Link to="/" className="flex-1">
          <button className="w-full h-12 py-3 rounded-lg border border-custom-blue2 text-custom-blue2 font-secondary-custom focus:outline-none focus:ring-2 focus:ring-blue-500">
            Back
          </button>
        </Link>
        <button
          onClick={handleSubmit}
          className="flex-1 h-12 py-3 bg-custom-blue2 rounded-lg text-white font-secondary-custom focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Get My Ticket
        </button>
      </div>
    </div>
  );
};

export default AttendeeDetails;