import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/doctors")
      .then((res) => {
        setDoctors(res.data);
        setFilteredDoctors(res.data);
      })
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);

  useEffect(() => {
    const updated = doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase());

      const matchesAvailability =
        filter === "all" ||
        doctor.availability.toLowerCase() === filter.toLowerCase();

      return matchesSearch && matchesAvailability;
    });

    setFilteredDoctors(updated);
  }, [search, filter, doctors]);

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen py-12 px-6">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-blue-800 mb-10">
          Book Your Doctor
        </h1>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search by name or specialization"
            className="w-full p-4 border border-blue-400 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex justify-center space-x-4 mb-10">
          {["all", "available", "unavailable"].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-6 py-2 rounded-full border border-blue-400 shadow ${
                filter === option
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600"
              } hover:bg-blue-600 hover:text-white transition`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredDoctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 transition-transform hover:scale-105"
            >
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-blue-800">{doc.name}</h2>
                <p className="text-blue-600">{doc.specialization}</p>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Email:</strong> {doc.email}
                </p>
                <p>
                  <strong>Experience:</strong> {doc.experience}
                </p>
                <p>
                  <strong>Availability:</strong>{" "}
                  <span
                    className={
                      doc.availability.toLowerCase() === "available"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {doc.availability}
                  </span>
                </p>
              </div>

              {/* Link to Appointment page, passing doctor ID as a route param */}
              <div className="mt-6 text-center">
                <Link to={`/book-appointment/${doc._id}`}>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition">
                    Book Appointment
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;