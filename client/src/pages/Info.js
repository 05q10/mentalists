import React, { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

const Info = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-500  text-white py-6 text-center">
        <h1 className="text-4xl font-bold">Fashion Trends & Insights</h1>
        <p className="mt-2 text-lg">
          Stay updated with the latest fashion trends and style tips.
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-10">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700">
            Latest Trends
          </h2>
          <p className="mt-2">
            Bold colors and statement pieces are in trend this season. Vintage
            fashion is making a comeback, and sustainable clothing is gaining
            momentum.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700">Style Tips</h2>
          <p className="mt-2">
            Layering outfits can create versatile looks. Neutral colors offer
            timeless elegance, and minimal jewelry enhances any outfit
            effortlessly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700">
            Sustainable Fashion
          </h2>
          <p className="mt-2">
            Support brands that use organic fabrics and ethical manufacturing.
            Thrift shopping helps reduce waste and promotes eco-conscious
            fashion.
          </p>
        </section>
      </main>

      {/* Chatbot Section */}
      <div className="fixed bottom-5 right-5">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-3 rounded-full shadow-lg hover:opacity-80 transition"
        >
          <MessageCircle size={24} />
        </button>

        {chatOpen && (
          <div className="absolute bottom-16 right-0 w-72 bg-white shadow-lg rounded-lg p-4">
            <div className="h-40 overflow-y-auto p-2 text-gray-800 text-sm">
              <p>👋 Hi! How can I help you with fashion today?</p>
            </div>
            <div className="flex items-center border-t pt-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border-none px-2 py-1 outline-none"
              />
              <button className="text-purple-600 hover:text-purple-800 p-2">
                <Send size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
