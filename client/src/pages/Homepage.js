import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/HomePage.css'; // Make sure to import the CSS file

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

// DoctorSearch Component
const DoctorSearch = ({ onSearch }) => {
    const [specialization, setSpecialization] = useState('');
    const [availability, setAvailability] = useState('');

    const handleSearch = () => {
        onSearch(specialization, availability);
    };

    return (
        <div className="doctor-search">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                />
                <select
                    className="form-select"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                >
                    <option value="">Availability</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                </select>
                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};

const HomePage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user ? user.role : null;

    useEffect(() => {
        axios.get('http://localhost:5000/')
            .then(response => console.log('Root API response:', response.data))
            .catch(error => console.error('Root API error:', error));
    }, []);

    const handleDoctorSearch = async (specialization, availability) => {
        try {
            const response = await axios.get('http://localhost:5000/api/search', {
                params: { specialization, availability, role: userRole },
            });
            setSearchResults(response.data);
            setSearchError('');
        } catch (error) {
            console.error('Search Error:', error);
            setSearchResults([]);
            setSearchError('Error fetching search results.');
        }
    };

    return (
        <div className="homepage-container">
            {/* HEADER SECTION */}
            <header className="site-header">
                <div className="header-content">
                    {/* Logo Placeholder -  */}
                    <div className="logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-stethoscope"><path d="M4 12v-1a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v7" /><path d="M10 18v-4" /><path d="M10 8h4" /><circle cx="6" cy="18" r="4" /><circle cx="18" cy="18" r="4" /></svg>
                    </div>
                    <h1 className="site-title">Your Health, Simplified.</h1>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="hero-section">
                <div className="hero-content">
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.3 }}
                        className="subheadline"
                    >
                        Find the right doctor and book appointments with ease. Explore our wide network of verified healthcare professionals.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.6 }}
                        className="search-container"
                    >
                        <DoctorSearch onSearch={handleDoctorSearch} />
                        {searchError && <p className="error-message">{searchError}</p>}
                    </motion.div>
                </div>
            </section>

            {/* KEY FEATURES SECTION */}
            <section className="key-features-section">
                <h2 className="section-heading">Key Features</h2>
                <div className="feature-list">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </div>
                        <h3 className="feature-title">Easy Doctor Search</h3>
                        <p className="feature-description">
                            Find the perfect doctor by specialization and availability. Our advanced search makes it simple to locate the healthcare professional that meets your specific needs.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-check-2"><path d="M20 7v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7" /><path d="M4 17H2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a2 0 0 0-2-2h-2" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M9 17l3 3 7-7" /></svg>
                        </div>
                        <h3 className="feature-title">Online Appointments</h3>
                        <p className="feature-description">
                            Skip the phone calls and book your appointments online, 24/7.  Our platform allows you to schedule visits at your convenience, with instant confirmation.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-2-8 2v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
                        </div>
                        <h3 className="feature-title">Verified Professionals</h3>
                        <p className="feature-description">
                            We verify the credentials of all doctors on our platform, so you can trust you're in good hands.  Your health and safety are our top priorities.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-layout-dashboard"><rect width="22" height="16" x="1" y="4" rx="4" /><rect width="6" height="6" x="5" y="8" rx="1" /><rect width="6" height="6" x="13" y="8" rx="1" /><rect width="6" height="6" x="5" y="16" rx="1" /></svg>
                        </div>
                        <h3 className="feature-title">Personalized Dashboard</h3>
                        <p className="feature-description">
                            Manage your appointments, view your medical history, and access important health information all in one place.  Our dashboard gives you control over your healthcare journey.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bell-ring"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /><path d="M8.2 17a4 4 0 0 1 7.6 0" /><path d="M6 13a8 8 0 0 1 12 0" /></svg>
                        </div>
                        <h3 className="feature-title">Reminders and Notifications</h3>
                        <p className="feature-description">
                            Receive timely reminders about upcoming appointments and important health updates.  Stay on top of your health schedule with our helpful notification system.
                        </p>
                    </div>
                </div>
            </section>

            {/* DASHBOARD LINK */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.9 }}
                className="dashboard-link"
            >
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                    Go to Your Dashboard
                </Link>
            </motion.div>

            {/* SEARCH RESULTS */}
            {searchResults.length > 0 && (
                <section className="search-results-section">
                    <h2 className="section-heading">Available Doctors</h2>
                    <motion.ul
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="doctors-list"
                    >
                        {searchResults.map((doctor) => (
                            <motion.li
                                key={doctor._id}
                                variants={itemVariants}
                                className="doctor-card"
                            >
                                <div className="card w-100 bg-light border shadow-sm">
                                    <div className="card-header">
                                        <h3 className="card-title h5">{doctor.name}</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="doctor-info">
                                            <p className="specialization text-muted">
                                                <strong>Specialization:</strong> {doctor.specialization || 'Not Specified'}
                                            </p>
                                            <p className="availability text-muted">
                                                <strong>Availability:</strong> {doctor.availability || 'Not Specified'}
                                            </p>
                                            {/* You can add a small profile picture here if available */}
                                        </div>
                                        <div className="doctor-actions d-flex gap-2 mt-3">
                                            <button className="btn btn-primary">
                                                Book Appointment
                                            </button>
                                            <Link to={`/doctor/${doctor._id}`} className="btn btn-secondary">
                                                View Profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.li>
                        ))}
                    </motion.ul>
                </section>
            )}

            {/* NO RESULTS */}
            {searchResults.length === 0 && !searchError && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="no-results text-muted text-center py-8"
                >
                    No doctors found matching your criteria. Please try a different search.
                </motion.p>
            )}

            {/* FOOTER */}
            <footer className="site-footer">
                <div className="footer-top">
                    <p className="text-gray-300">Connect with us:</p>
                    <div className="social-links">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            <FontAwesomeIcon icon={faFacebook} size="lg" />
                        </a>
                        <a
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="text-sky-400 hover:text-sky-300 transition-colors"
                        >
                            <FontAwesomeIcon icon={faTwitter} size="lg" />
                        </a>
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="text-pink-400 hover:text-pink-300 transition-colors"
                        >
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                    </div>
                </div>
                <p className="text-gray-400 text-center mt-4">
                    &copy; {new Date().getFullYear()} Hospital Portal. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default HomePage;
