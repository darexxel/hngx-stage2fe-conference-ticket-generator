import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import TicketIcon from '../assets/hugeicons_ticket-01.svg';
import TiczLogo from '../assets/ticz.svg';

const Navbar = () => {
  const location = useLocation();

  const isNavLinkActive = (pathname) => location.pathname === pathname;

  return (
    <div className="px-4 md:px-[120px] py-6">
      <nav className="flex justify-between items-center border border-custom-blue1 bg-custom-dark2 p-4 rounded-[16px]">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={TicketIcon} alt="ticket" className="w-6 h-6" />
          <img src={TiczLogo} alt="ticz" className="text-white" />
        </div>

        {/* Navigation Links (hidden on mobile) */}
        <div className="hidden md:flex gap-16">
          <div
            className={`text-lg font-normal font-secondary-custom ${
              isNavLinkActive("/") ? "text-white" : "text-custom-gray2"
            }`}
          >
            <Link to="/">Events</Link>
          </div>
          <div
            className={`text-lg font-normal font-secondary-custom ${
              isNavLinkActive("/my-tickets") ? "text-white" : "text-custom-gray2"
            }`}
          >
            <Link to="/my-tickets">My Tickets</Link>
          </div>
          <div
            className={`text-lg font-normal font-secondary-custom ${
              isNavLinkActive("/about") ? "text-white" : "text-custom-gray2"
            }`}
          >
            <Link to="/about">About Project</Link>
          </div>
        </div>

        {/* My Tickets Button */}
        <div>
          <Link
            to="/my-tickets"
            className="px-4 py-2 bg-white rounded text-custom-dark6 text-base font-normal font-secondary-custom uppercase leading-tight"
          >
            My Tickets →
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
