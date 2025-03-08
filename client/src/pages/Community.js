import React, { useState, useEffect } from 'react';
import { Search, Plus, Check } from 'lucide-react';

const Community = () => {
  // Sample data for gig opportunities
  const [allGigs, setAllGigs] = useState([
    {
      id: 1,
      name: "Website Development",
      place: "Remote",
      time: "2-3 weeks",
      category: "coding",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Logo Design",
      place: "New York",
      time: "5 days",
      category: "design",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Content Writing",
      place: "Remote",
      time: "Ongoing",
      category: "writing",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      name: "Video Editing",
      place: "Los Angeles",
      time: "1 week",
      category: "media",
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      name: "Data Analysis",
      place: "Chicago",
      time: "3 days",
      category: "coding",
      image: "/api/placeholder/300/200"
    },
    {
      id: 6,
      name: "App Testing",
      place: "Remote",
      time: "Weekend",
      category: "coding",
      image: "/api/placeholder/300/200"
    },
    {
      id: 7,
      name: "Social Media Management",
      place: "Austin",
      time: "Monthly",
      category: "marketing",
      image: "/api/placeholder/300/200"
    },
    {
      id: 8,
      name: "Photography",
      place: "Miami",
      time: "1 day",
      category: "media",
      image: "/api/placeholder/300/200"
    },
    {
      id: 9,
      name: "Transcription",
      place: "Remote",
      time: "Flexible",
      category: "writing",
      image: "/api/placeholder/300/200"
    },
    {
      id: 10,
      name: "UI/UX Design",
      place: "Seattle",
      time: "2 weeks",
      category: "design",
      image: "/api/placeholder/300/200"
    },
    {
      id: 11,
      name: "Copywriting",
      place: "Remote",
      time: "3 days",
      category: "writing",
      image: "/api/placeholder/300/200"
    },
    {
      id: 12,
      name: "Event Photography",
      place: "Boston",
      time: "Weekend",
      category: "media",
      image: "/api/placeholder/300/200"
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGigs, setFilteredGigs] = useState(allGigs);
  const [favorites, setFavorites] = useState([]);
  const [carouselPositions, setCarouselPositions] = useState([0, 0, 0]);
  
  // Filter gigs based on search term
  useEffect(() => {
    const filtered = allGigs.filter(gig => 
      gig.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      gig.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gig.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGigs(filtered);
  }, [searchTerm, allGigs]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselPositions((prev) => [
        (prev[0] + 0.05) % Math.max(filteredGigs.length - 2, 1),
        (prev[1] + 0.05) % Math.max(filteredGigs.length - 2, 1),
        (prev[2] + 0.05) % Math.max(filteredGigs.length - 2, 1)
      ]);
    }, 150); // Increased interval time for smoother motion
  
    return () => clearInterval(interval);
  }, [filteredGigs.length]);
  
  
  // Toggle favorite status
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  // Group gigs into columns
  const getColumnGigs = (columnIndex) => {
    const startIdx = Math.floor(carouselPositions[columnIndex]);
    return filteredGigs.slice(startIdx, startIdx + 5);
  };
  
  return (
    <div className="min-h-screen flex flex-col" style={{
      background: 'linear-gradient(135deg, #f5f0ff 0%, #e0d0ff 100%)'
    }}>
      <div className="w-full px-6 py-8">
        <h1 className="text-4xl font-bold mb-8 text-purple-800 text-center">Gig Community</h1>
        
        {/* Search Bar */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex items-center border-2 border-purple-300 rounded-lg overflow-hidden bg-white shadow-lg">
            <input
              type="text"
              placeholder="Search for gigs by name, location, or category..."
              className="w-full py-4 px-6 focus:outline-none text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="p-4 bg-purple-100">
              <Search className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
        
        {/* Carousels Container */}
        <div className="flex space-x-6 px-4">
          {/* Column 1 */}
          <div className="w-1/3 bg-purple-50 rounded-lg p-4 shadow-lg" style={{
            background: 'linear-gradient(to bottom, #f9f5ff, #f0e6ff)',
            borderTop: '4px solid #a78bfa'
          }}>
            <h2 className="text-xl font-semibold mb-6 text-purple-700">Popular Gigs</h2>
            <div 
  className="space-y-6 transition-transform duration-500 ease-linear"
  style={{ 
    transform: `translateY(-${carouselPositions[0] * 15}px)`, 
    height: '70vh',
    overflow: 'hidden'
  }}
>

              {getColumnGigs(0).map(gig => (
                <div 
                  key={gig.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  style={{
                    borderLeft: '3px solid #a78bfa'
                  }}
                >
                  <img src={gig.image} alt={gig.name} className="w-full h-40 object-cover" />
                  <div className="p-4 flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-purple-900 text-lg">{gig.name}</h3>
                      <p className="text-sm text-gray-600">{gig.place}</p>
                      <p className="text-xs text-gray-500 mt-1">{gig.time}</p>
                    </div>
                    <button 
                      onClick={() => toggleFavorite(gig.id)}
                      className={`p-2 rounded-full transition-colors duration-300 ${favorites.includes(gig.id) ? 'bg-purple-100 hover:bg-purple-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      {favorites.includes(gig.id) ? 
                        <Check size={18} className="text-purple-600" /> : 
                        <Plus size={18} className="text-purple-600" />
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Column 2 */}
          <div className="w-1/3 bg-purple-50 rounded-lg p-4 shadow-lg" style={{
            background: 'linear-gradient(to bottom, #f7f2ff, #ede0ff)',
            borderTop: '4px solid #9061f9'
          }}>
            <h2 className="text-xl font-semibold mb-6 text-purple-700">Recent Opportunities</h2>
            <div 
              className="space-y-6 transition-all duration-1000 ease-in-out" 
              style={{ 
                transform: `translateY(-${carouselPositions[1] * 15}px)`,
                height: '70vh',
                overflow: 'hidden'
              }}
            >
              {getColumnGigs(1).map(gig => (
                <div 
                  key={gig.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  style={{
                    borderLeft: '3px solid #9061f9'
                  }}
                >
                  <img src={gig.image} alt={gig.name} className="w-full h-40 object-cover" />
                  <div className="p-4 flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-purple-900 text-lg">{gig.name}</h3>
                      <p className="text-sm text-gray-600">{gig.place}</p>
                      <p className="text-xs text-gray-500 mt-1">{gig.time}</p>
                    </div>
                    <button 
                      onClick={() => toggleFavorite(gig.id)}
                      className={`p-2 rounded-full transition-colors duration-300 ${favorites.includes(gig.id) ? 'bg-purple-100 hover:bg-purple-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      {favorites.includes(gig.id) ? 
                        <Check size={18} className="text-purple-600" /> : 
                        <Plus size={18} className="text-purple-600" />
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Column 3 */}
          <div className="w-1/3 bg-purple-50 rounded-lg p-4 shadow-lg" style={{
            background: 'linear-gradient(to bottom, #f4efff, #e8d8ff)',
            borderTop: '4px solid #7c3aed'
          }}>
            <h2 className="text-xl font-semibold mb-6 text-purple-700">Featured Gigs</h2>
            <div 
              className="space-y-3 transition-all duration-1000 ease-in-out" 
              style={{ 
                transform: `translateY(-${carouselPositions[2] * 15}px)`,
                height: '70vh',
                overflow: 'hidden'
              }}
            >
              {getColumnGigs(2).map(gig => (
                <div 
                  key={gig.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  style={{
                    borderLeft: '3px solid #7c3aed'
                  }}
                >
                  <img src={gig.image} alt={gig.name} className="w-full h-40 object-cover" />
                  <div className="p-4 flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-purple-900 text-lg">{gig.name}</h3>
                      <p className="text-sm text-gray-600">{gig.place}</p>
                      <p className="text-xs text-gray-500 mt-1">{gig.time}</p>
                    </div>
                    <button 
                      onClick={() => toggleFavorite(gig.id)}
                      className={`p-2 rounded-full transition-colors duration-300 ${favorites.includes(gig.id) ? 'bg-purple-100 hover:bg-purple-200' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      {favorites.includes(gig.id) ? 
                        <Check size={18} className="text-purple-600" /> : 
                        <Plus size={18} className="text-purple-600" />
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Favorite Gigs Summary */}
        <div className="mt-8 bg-purple-100 p-5 rounded-lg max-w-4xl mx-auto shadow-md" style={{
          background: 'linear-gradient(to right, #ede9ff, #ddd1ff)'
        }}>
          <h2 className="text-xl font-semibold mb-2 text-purple-800">Saved Opportunities ({favorites.length})</h2>
          {favorites.length > 0 ? (
            <p className="text-purple-700">You have saved {favorites.length} gig(s). Check your profile to review them.</p>
          ) : (
            <p className="text-purple-700">Save gigs by clicking the plus icon to keep track of opportunities you're interested in.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;