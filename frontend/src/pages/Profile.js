import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile({ user }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("info");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/auth", { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="auth-required">
        <h2>Please login to view your profile</h2>
      </div>
    );
  }

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/update-profile", {
        userId: user.id,
        phone,
        address,
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Error updating profile");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/change-password", {
        userId: user.id,
        oldPassword,
        newPassword,
      });
      toast.success("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Error changing password");
    }
  };

  return (
    <div className="profile-card">
      <h2>👤 My Profile</h2>

      <div className="tabs">
        <button
          className={tab === "info" ? "active" : ""}
          onClick={() => setTab("info")}
        >
          Profile Info
        </button>
        <button
          className={tab === "password" ? "active" : ""}
          onClick={() => setTab("password")}
        >
          Change Password
        </button>
      </div>

      {tab === "info" && (
        <form onSubmit={updateProfile} className="profile-form">
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={user.username} disabled />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button type="submit" className="save-btn">Save Changes</button>
        </form>
      )}

      {tab === "password" && (
        <form onSubmit={changePassword} className="profile-form">
          <div className="form-group">
            <label>Old Password:</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="save-btn">Change Password</button>
        </form>
      )}
    </div>
  );
}

export default Profile;
