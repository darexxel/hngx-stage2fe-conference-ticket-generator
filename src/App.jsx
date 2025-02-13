import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Events from './pages/Events';
import AttendeeDetails from './pages/AttendeeDetails';
import TicketConfirmation from './pages/TicketConfirmation'; // Import TicketConfirmation
import MyTickets from './pages/MyTickets';
import About from './pages/About';
import './index.css';

const App = () => {
  return (
    <div className="min-h-screen arch-gradient-background">
      <Navbar />
      <main className="p-8">
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/about" element={<About />} />
          <Route path="/attendee-details" element={<AttendeeDetails />} />
          <Route path="/ticket-confirmation" element={<TicketConfirmation />} /> {/* Add TicketConfirmation route */}
        </Routes>
      </main>
    </div>
  );
};

export default App;