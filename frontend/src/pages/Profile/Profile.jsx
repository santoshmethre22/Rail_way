import React, { useEffect, useState } from 'react';
import { userData } from '../../context/userContext.jsx';
import { Link } from 'react-router-dom';
import './Profile.css'; // Importing the CSS file

function Profile() {
    const { getuser } = userData();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getuser(); // Call getuser and get user data
                if (userData) {
                    setUser(userData); // Set user data in state
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <p className="loading-text">Loading...</p>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
            <img 
             src={user.image ? user.image : "/default-profile.png"} 
            alt="Profile" 
            className="profile-image"
        />
      

      
        <h2 className="profile-name">{user.name}</h2>
                <h3 className="profile-email">Email: {user.email}</h3>
                <h3 className="profile-phone">Phone: {user.phone}</h3>
                <Link to="/booking-history" className="booking-link">View Booking History</Link>
            </div>
        </div>
    );
}

export default Profile;