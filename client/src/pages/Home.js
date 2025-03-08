import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalculator } from "react-icons/fa6"
import { FaUsers } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { IoBarChartSharp } from "react-icons/io5"
import { FaLongArrowAltRight } from "react-icons/fa";


// import {
  // IconCalculator,
//   IconUsers,
//   IconBook,
//   IconChartBar,
//   IconArrowRight,
// } from "@tabler/icons-react";

export function HomePage() {
  // Features showcased on the homepage
  const features = [
    {
      title: "Rate Calculator",
      description:
        "Industry benchmarks, experience-based pricing, and cost estimation tools",
       icon: <FaCalculator />,
      link: "/rate-calculator",
      color: "bg-indigo-50",
    },
    {
      title: "Client Management",
      description:
        "Contract templates, invoice tracking, and client communication portal",
       icon: <FaUsers />,
      link: "/client-management",
      color: "bg-emerald-50",
    },
    {
      title: "Professional Development",
      description:
        "Skill development, networking, and industry-specific career resources",
      icon: <FaBook />,
      link: "/professional-development",
      color: "bg-amber-50",
    },
    {
      title: "Project Tracker",
      description:
        "Real-time updates, milestone tracking, and deadline management",
       icon: <IoBarChartSharp />,
      link: "/project-tracker",
      color: "bg-rose-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-500 text-white">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="h-10 w-12 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
              <h1 className="ml-3 text-4xl md:text-5xl font-bold tracking-tight">
                GigWiz
              </h1>
            </div>
            <p className="mt-6 text-xl md:text-2xl font-light">
              Your all-in-one resource hub for thriving in the gig economy
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/signup"
                className="px-8 py-3 rounded-md bg-white text-indigo-700 font-medium hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/learn-more"
                className="px-8 py-3 rounded-md bg-indigo-700 text-white font-medium hover:bg-indigo-800 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Tools and resources designed specifically for independent workers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            >
              <Link to={feature.link} className="block h-full">
                <div
                  className={`${feature.color} p-6 rounded-lg h-full hover:shadow-md transition-shadow`}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center text-indigo-600 font-medium">
                    <span>Learn more</span>
                    <FaLongArrowAltRight />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-indigo-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold">90%</h3>
              <p className="mt-2 text-indigo-200">
                Users report improved financial management
              </p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">75%</h3>
              <p className="mt-2 text-indigo-200">
                Increase in on-time client payments
              </p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">10K+</h3>
              <p className="mt-2 text-indigo-200">
                Active gig workers on our platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 md:p-12 shadow-xl">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Ready to take control of your gig work?
              </h2>
              <p className="mt-2 text-lg text-purple-100">
                Join thousands of freelancers who've transformed their work life
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link
                to="/admin/track"
                className="inline-block px-8 py-3 rounded-md bg-white text-indigo-700 font-medium hover:bg-gray-100 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-6 w-8 bg-indigo-600 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
              <span className="ml-2 text-lg font-medium text-gray-800">
                Blossom, Bubbles, & Bytes
              </span>
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-600 hover:text-indigo-600">
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-indigo-600"
              >
                Contact
              </Link>
              <Link to="/terms" className="text-gray-600 hover:text-indigo-600">
                Terms
              </Link>
              <Link
                to="/privacy"
                className="text-gray-600 hover:text-indigo-600"
              >
                Privacy
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Blossom, Bubbles, & Bytes. All rights
            reserved.
          </div>
        </div>
      </footer> */}
    </div>
  );
}

export default HomePage;
