import React, { useState, useRef } from 'react';
// import img1 from "../img/math";

function User() {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const contactFormRef = useRef(null);

  // Sample data for service categories
  const categories = [
    { id: 1, name: 'Cooking', icon: '🍳', color: '#9d8cd4' },
    { id: 2, name: 'Artisans', icon: '🎨', color: '#b39ddb' },
    { id: 3, name: 'Home Services', icon: '🏠', color: '#d1c4e9' },
    { id: 4, name: 'Education', icon: '📚', color: '#8676b6' },
    { id: 5, name: 'Tech Support', icon: '💻', color: '#7e57c2' },
  ];

  // Sample data for services
  const services = [
    { 
      id: 1, 
      name: 'Personal Chef', 
      category: 'Cooking',
      description: 'Hire a personal chef to cook delicious meals for your events or daily needs.',
      image: '/api/placeholder/300/200',
      provider: 'Chef Maria',
      rating: 4.8 
    },
    { 
      id: 2, 
      name: 'Handmade Pottery', 
      category: 'Artisans',
      description: 'Custom pottery pieces created by skilled artisans for your home or as gifts.',
      image: '/api/placeholder/300/200',
      provider: 'Artisan Tom',
      rating: 4.9 
    },
    { 
      id: 3, 
      name: 'House Cleaning', 
      category: 'Home Services',
      description: 'Professional cleaning services to keep your home spotless and sanitized.',
      image: '/api/placeholder/300/200',
      provider: 'CleanCo',
      rating: 4.7 
    },
    { 
      id: 4, 
      name: 'Math Tutoring', 
      category: 'Education',
      description: 'Expert tutoring for students struggling with mathematics at any level.',
      image: '/api/placeholder/300/200',
      provider: 'Professor Lee',
      rating: 4.9 
    },
    { 
      id: 5, 
      name: 'Computer Repair', 
      category: 'Tech Support',
      description: 'Fast and reliable computer repair services for all your technical issues.',
      image: '/api/placeholder/300/200',
      provider: 'TechFix',
      rating: 4.6 
    },
    { 
      id: 6, 
      name: 'Baking Classes', 
      category: 'Cooking',
      description: 'Learn to bake like a professional with our interactive baking classes.',
      image: '/api/placeholder/300/200',
      provider: 'Baker John',
      rating: 4.8 
    },
    { 
      id: 7, 
      name: 'Graphic Design', 
      category: 'Artisans',
      description: 'Creative graphic design services for your business or personal projects.',
      image: '/api/placeholder/300/200',
      provider: 'DesignPro',
      rating: 4.7 
    },
    { 
      id: 8, 
      name: 'Language Lessons', 
      category: 'Education',
      description: 'Private language lessons to help you become fluent in any language.',
      image: '/api/placeholder/300/200',
      provider: 'LinguaMaster',
      rating: 4.8 
    },
  ];

  // Voice search functionality
  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      alert('Voice search is not supported in your browser');
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowContactForm(true);
    // Scroll to contact form after a short delay to allow for render
    setTimeout(() => {
      contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Your message has been sent to ${selectedService.provider}. They will contact you shortly!`);
    setShowContactForm(false);
  };

  const filteredServices = searchQuery 
    ? services.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : services;

  return (
    <div className="container">
      <header className="header">
        <h1>Discover Premium Services</h1>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search for services..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button 
            onClick={startListening}
            className={`voice-search-btn ${isListening ? 'listening' : ''}`}
          >
            {isListening ? 'Listening...' : '🎤 Voice Search'}
          </button>
        </div>
      </header>

      <main className="main">
        <section className="categories-section">
          <h2>Browse Categories</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <div 
                key={category.id} 
                className="category-card"
                style={{ backgroundColor: category.color }}
                onClick={() => setSearchQuery(category.name)}
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="featured-section">
          <h2>Featured Services</h2>
          <div className="carousel-container">
            <div className="cards-section">
              <div className="cards-container">
                {/* First set of cards */}
                {filteredServices.map(service => (
                  <div 
                    key={service.id} 
                    className="service-card"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <img src={service.image} alt={service.name} className="service-image" />
                    <div className="service-info">
                      <h3>{service.name}</h3>
                      <p className="service-description">{service.description}</p>
                      <div className="service-provider">
                        <span>{service.provider}</span>
                        <span className="service-rating">⭐ {service.rating}</span>
                      </div>
                      <button className="contact-btn">Contact Now</button>
                    </div>
                  </div>
                ))}
                {/* Duplicate first few cards to create the continuous effect */}
                {filteredServices.slice(0, 4).map(service => (
                  <div 
                    key={`duplicate-${service.id}`} 
                    className="service-card"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <img src={service.image} alt={service.name} className="service-image" />
                    <div className="service-info">
                      <h3>{service.name}</h3>
                      <p className="service-description">{service.description}</p>
                      <div className="service-provider">
                        <span>{service.provider}</span>
                        <span className="service-rating">⭐ {service.rating}</span>
                      </div>
                      <button className="contact-btn">Contact Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {showContactForm && selectedService && (
          <section className="contact-section" ref={contactFormRef}>
            <div className="contact-container">
              <div className="contact-header">
                <h2>Contact {selectedService.provider}</h2>
                <button className="close-btn" onClick={() => setShowContactForm(false)}>×</button>
              </div>
              <div className="contact-content">
                <div className="service-details">
                  <img src={selectedService.image} alt={selectedService.name} className="contact-image" />
                  <div>
                    <h3>{selectedService.name}</h3>
                    <p>{selectedService.description}</p>
                    <p className="highlight-text">⭐ {selectedService.rating}/5 rating</p>
                  </div>
                </div>
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" rows="4" required></textarea>
                  </div>
                  <button type="submit" className="submit-btn">Send Message</button>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f8f6ff;
          min-height: 100vh;
          color: #4a4a4a;
        }

        .header {
          background: linear-gradient(135deg, #9d8cd4 0%, #7e57c2 100%);
          padding: 2rem;
          color: white;
          text-align: center;
          box-shadow: 0 4px 20px rgba(126, 87, 194, 0.3);
        }

        .header h1 {
          margin-bottom: 1.5rem;
          font-weight: 700;
          font-size: 2.5rem;
        }

        .search-container {
          display: flex;
          max-width: 600px;
          margin: 0 auto;
          border-radius: 50px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .search-input {
          flex: 1;
          padding: 0.8rem 1.5rem;
          border: none;
          font-size: 1rem;
          outline: none;
        }

        .voice-search-btn {
          padding: 0.8rem 1.5rem;
          border: none;
          background-color: white;
          color: #7e57c2;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .voice-search-btn.listening {
          background-color: #ff6b6b;
          color: white;
        }

        .main {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .categories-section {
          margin-bottom: 3rem;
        }

        h2 {
          color: #7e57c2;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
          position: relative;
          display: inline-block;
        }

        h2::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #9d8cd4, transparent);
          border-radius: 3px;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .category-card {
          background-color: #9d8cd4;
          border-radius: 12px;
          padding: 1.5rem;
          color: white;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .category-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .category-card h3 {
          font-weight: 600;
          margin: 0;
        }

        .featured-section {
          margin-bottom: 3rem;
        }

        .carousel-container {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow: hidden;
        }

        .cards-section {
          margin: 0;
          padding: 20px 0;
          overflow: hidden;
          width: 100%;
        }

        .cards-container {
          display: flex;
          gap: 20px;
          flex-wrap: nowrap;
          transform: translateX(0);
          animation: carousel 30s linear infinite;
        }

        .cards-container:hover {
          animation-play-state: paused;
        }

        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }

        .service-card {
          flex: 0 0 300px;
          border-radius: 12px;
          overflow: hidden;
          background-color: white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(126, 87, 194, 0.2);
        }

        .service-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .service-info {
          padding: 1.2rem;
        }

        .service-info h3 {
          margin: 0 0 0.5rem 0;
          color: #7e57c2;
        }

        .service-description {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .service-provider {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .service-rating {
          color: #ffc107;
        }

        .contact-btn {
          width: 100%;
          padding: 0.7rem;
          background-color: #9d8cd4;
          color: white;
          border: none;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .contact-btn:hover {
          background-color: #7e57c2;
        }

        .contact-section {
          margin-top: 2rem;
          padding: 1rem;
          border-radius: 12px;
          background-color: white;
          box-shadow: 0 4px 25px rgba(126, 87, 194, 0.15);
        }

        .contact-container {
          overflow: hidden;
        }

        .contact-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e6e1f9;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #7e57c2;
          cursor: pointer;
        }

        .contact-content {
          padding: 1.5rem 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .service-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }

        .highlight-text {
          color: #7e57c2;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .form-group label {
          font-size: 0.9rem;
          font-weight: 500;
          color: #666;
        }

        .form-group input,
        .form-group textarea {
          padding: 0.8rem;
          border: 1px solid #e6e1f9;
          border-radius: 8px;
          font-family: inherit;
          resize: none;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #9d8cd4;
          outline: none;
        }

        .submit-btn {
          padding: 0.8rem;
          background-color: #7e57c2;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 0.5rem;
        }

        .submit-btn:hover {
          background-color: #6a45b6;
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
          }
          
          .search-container {
            flex-direction: column;
            border-radius: 0;
          }
          
          .search-input, .voice-search-btn {
            border-radius: 0;
          }
          
          .categories-grid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}

export default User;