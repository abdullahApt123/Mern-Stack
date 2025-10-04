import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import RoomsPage from './components/RoomsPage';
import RoomTypesPage from './components/RoomTypesPage';
import RoomCategoriesPage from './components/RoomCategoriesPage';
import ReviewsPage from './components/ReviewsPage';
import UserManagementPage from './components/UserManagementPage';
import ProfilePage from './components/ProfilePage';
import BillingPage from './components/BillingPage';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Listen for profile navigation event
  React.useEffect(() => {
    const handleProfileNavigation = () => {
      setCurrentPage('profile');
    };

    window.addEventListener('navigate-to-profile', handleProfileNavigation);
    return () => window.removeEventListener('navigate-to-profile', handleProfileNavigation);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'rooms':
        return <RoomsPage />;
      case 'room-types':
        return <RoomTypesPage />;
      case 'room-categories':
        return <RoomCategoriesPage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'users':
        return <UserManagementPage />;
      case 'profile':
        return <ProfilePage />;
      case 'billing':
        return <BillingPage />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header onMenuToggle={toggleSidebar} />
        <main className="flex-1">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}

export default App;