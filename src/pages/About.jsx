// src/pages/About.jsx
const About = () => {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl text-white font-jeju mb-8">About Project</h1>
        <div className="bg-custom-dark3 rounded-lg p-8">
          <section className="mb-8">
            <h2 className="text-2xl text-white font-roadrage mb-4">Our Mission</h2>
            <p className="text-neutral-50">
              To provide a seamless and enjoyable ticketing experience for tech events,
              connecting enthusiasts with the most innovative gatherings in the industry.
            </p>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl text-white font-roadrage mb-4">Features</h2>
            <ul className="text-neutral-50 space-y-2">
              <li>🎟️ Easy ticket booking</li>
              <li>🔒 Secure payment processing</li>
              <li>📱 Digital ticket management</li>
              <li>🔔 Event notifications</li>
            </ul>
          </section>
  
          <section>
            <h2 className="text-2xl text-white font-roadrage mb-4">Contact</h2>
            <div className="text-neutral-50 space-y-2">
              <p>📧 support@techember.com</p>
              <p>📱 +1 (555) 123-4567</p>
            </div>
          </section>
        </div>
      </div>
    );
  };
  
  export default About;