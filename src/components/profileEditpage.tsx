import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPen } from "react-icons/fa";

interface Profile {
    name: string;
    email: string;
    bio: string;
    profilePicture: string;
    socialMedia: {
        facebook: string;
        instagram: string;
        linkedin: string;
        discord: string;
        whatsapp: string;
    };
}

const ProfileEditPage: React.FC = () => {
    const [profile, setProfile] = useState<Profile>({
        name: "",
        email: "",
        bio: "",
        profilePicture: "",
        socialMedia: {
            facebook: "",
            instagram: "",
            linkedin: "",
            discord: "",
            whatsapp: "",
        },
    });
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const statusResponse = await axios.get("https://rumi-backend-wvba.onrender.com/api/users/status");
                const userId = statusResponse.data.userId;
                setUserId(userId);
                const profileResponse = await axios.get(`https://rumi-backend-wvba.onrender.com/api/profile:${userId}`);
                setProfile(profileResponse.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        if (name in profile.socialMedia) {
            setProfile({
                ...profile,
                socialMedia: {
                    ...profile.socialMedia,
                    [name]: value,
                },
            });
        } else {
            setProfile({
                ...profile,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userId) {
            try {
                await axios.put(`https://rumi-backend-wvba.onrender.com/api/profile:${userId}`, profile);
                console.log("Profile updated:", profile);
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h1>Edit Profile</h1>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="bio">Bio:</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={profile.bio}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="profilePicture">Profile Picture:</label>
                        <input
                            type="text"
                            id="profilePicture"
                            name="profilePicture"
                            value={profile.profilePicture}
                            onChange={handleChange}
                        />
                    </div>
                    {Object.entries(profile.socialMedia).map(([platform, link]) => (
                        <SocialMediaEdit key={platform} platform={platform} link={link} onChange={handleChange} />
                    ))}
                    <button type="submit">Save Changes</button>
                </form>
            </div>
            <div className="card-footer">
                <p>Make sure to save your changes!</p>
            </div>
        </div>
    );
};

const SocialMediaEdit: React.FC<{ platform: string; link: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ platform, link, onChange }) => (
    <div>
        <label htmlFor={platform}>{platform.charAt(0).toUpperCase() + platform.slice(1)}:</label>
        <input
            type="text"
            id={platform}
            name={platform}
            value={link}
            onChange={onChange}
        />
        <FaPen />
    </div>
);

export default ProfileEditPage;