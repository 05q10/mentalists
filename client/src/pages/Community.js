import React, { useState, useEffect } from "react";
import { Search, Plus, Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import graphic from "../img/graphic.jpg";
import tutor from "../img/tutor.jpg";
import virtual from "../img/virtual.jpg";
import writing from "../img/writing.jpg";
import social from "../img/social.jpg";
import shop from "../img/shop.jpg";
import lang from "../img/lang.jpg";
import photo from "../img/photo.jpg";

const Community = () => {
  const navigate = useNavigate();

  // Sample data for gig opportunities
  const [allGigs, setAllGigs] = useState([
    {
      id: 1,
      name: "Freelance Writing",
      place: "Remote",
      time: "Flexible",
      category: "writing",
      image: writing,
      route: "/gigs/freelance-writing",
    },
    {
      id: 2,
      name: "Virtual Assistance",
      place: "Remote",
      time: "Ongoing",
      category: "administration",
      image: virtual,
      route: "/gigs/virtual-assistance",
    },
    {
      id: 3,
      name: "Graphic Design",
      place: "Remote",
      time: "Project-based",
      category: "design",
      image: graphic,
      route: "/gigs/graphic-design",
    },
    {
      id: 4,
      name: "Online Tutoring",
      place: "Remote",
      time: "Hourly",
      category: "education",
      image: tutor,
      route: "/gigs/online-tutoring",
    },
    {
      id: 5,
      name: "Social Media Management",
      place: "Remote",
      time: "Monthly",
      category: "marketing",
      image: social,
      route: "/gigs/social-media-management",
    },
    {
      id: 6,
      name: "E-commerce Selling",
      place: "Remote",
      time: "Flexible",
      category: "business",
      image: shop,
      route: "/gigs/ecommerce-selling",
    },
    {
      id: 7,
      name: "Transcription & Translation",
      place: "Remote",
      time: "Per project",
      category: "writing",
      image: lang,
      route: "/gigs/transcription-translation",
    },
    {
      id: 8,
      name: "Photography",
      place: "Local",
      time: "Event-based",
      category: "media",
      image: photo,
      route: "/gigs/photography",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGigs, setFilteredGigs] = useState(allGigs);
  const [favorites, setFavorites] = useState([]);

  // Filter gigs based on search term
  useEffect(() => {
    const filtered = allGigs.filter(
      (gig) =>
        gig.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gig.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGigs(filtered);
  }, [searchTerm, allGigs]);

  // Toggle favorite status
  const toggleFavorite = (e, id) => {
    e.stopPropagation(); // Prevent navigation when clicking favorite button
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Navigate to gig details page
  const navigateToGig = (route) => {
    navigate(route);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(135deg, #f5f0ff 0%, #e0d0ff 100%)",
      }}
    >
      <div className="w-full px-6 py-8">
        <h1 className="text-4xl font-bold mb-8 text-purple-800 text-center">
          Gig Community
        </h1>

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

        {/* Grid Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGigs.map((gig) => (
              <div
                key={gig.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                style={{
                  borderLeft: "3px solid #9061f9",
                  borderTop: "2px solid #a78bfa",
                  transition: "all 0.3s ease",
                }}
                onClick={() => navigateToGig("/info")}
              >
                <div className="relative">
                  <img
                    src={gig.image}
                    alt={gig.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={(e) => toggleFavorite(e, gig.id)}
                      className={`p-2 rounded-full transition-colors duration-300 ${
                        favorites.includes(gig.id)
                          ? "bg-purple-100 hover:bg-purple-200"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {favorites.includes(gig.id) ? (
                        <Check size={18} className="text-purple-600" />
                      ) : (
                        <Plus size={18} className="text-purple-600" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-purple-900 text-lg">
                    {gig.name}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-600">{gig.place}</p>
                    <p className="text-xs text-gray-500">{gig.time}</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToGig("/info");
                      }}
                      className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors duration-300"
                    >
                      <ArrowRight size={18} className="text-purple-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Gigs Summary */}
        <div
          className="mt-12 bg-purple-100 p-5 rounded-lg max-w-4xl mx-auto shadow-md"
          style={{
            background: "linear-gradient(to right, #ede9ff, #ddd1ff)",
          }}
        >
          <h2 className="text-xl font-semibold mb-2 text-purple-800">
            Saved Opportunities ({favorites.length})
          </h2>
          {favorites.length > 0 ? (
            <p className="text-purple-700">
              You have saved {favorites.length} gig(s). Check your profile to
              review them.
            </p>
          ) : (
            <p className="text-purple-700">
              Save gigs by clicking the plus icon to keep track of opportunities
              you're interested in.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
