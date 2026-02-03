import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoPencil, IoLockClosed } from 'react-icons/io5';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import Modal from '../components/common/Modal';
import ProfileInfo from '../components/profile/profileInfo';
import ProfileEdit from '../components/profile/ProfileEdit';
import PasswordChange from '../components/profile/PasswordChange';
import AccountStats from '../components/profile/AccountStats';
import { useAuth } from '../context/AuthContext';
import userService from '../services/userService';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUpdate = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleProfileSubmit = async (formData) => {
    try {
      const response = await userService.updateUserProfile(formData);
      updateUser(response.data);
      toast.success('Profile updated successfully! ✨');
      setIsEditModalOpen(false);
      handleUpdate();
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error(error.message || 'Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Sidebar />

      <main className="main-content">
        <div className="container-custom">
          <Navbar title="My Profile" />

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-wrap items-center justify-between gap-4"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h2>
              <p className="text-gray-600">Manage your profile and preferences</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="btn btn-primary"
              >
                <IoPencil className="w-5 h-5" />
                Edit Profile
              </button>
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="btn btn-outline"
              >
                <IoLockClosed className="w-5 h-5" />
                Change Password
              </button>
            </div>
          </motion.div>

          {/* Profile Info */}
          <div className="mb-6">
            <ProfileInfo user={user} key={refreshKey} />
          </div>

          {/* Account Statistics */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Account Statistics
            </h2>
            <AccountStats />
          </div>

          {/* Edit Profile Modal */}
          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="Edit Profile"
            size="lg"
          >
            <ProfileEdit
              user={user}
              onClose={() => setIsEditModalOpen(false)}
              onSubmit={handleProfileSubmit}
            />
          </Modal>

          {/* Change Password Modal */}
          <Modal
            isOpen={isPasswordModalOpen}
            onClose={() => setIsPasswordModalOpen(false)}
            title="Change Password"
            size="md"
          >
            <PasswordChange onClose={() => setIsPasswordModalOpen(false)} />
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default Profile;