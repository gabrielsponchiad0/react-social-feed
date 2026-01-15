import { Home, Search, Compass, MessageCircle, Heart, PlusSquare, User, Menu } from 'lucide-react';
import '../App.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h1 className="logo-text">Feedly</h1>
      </div>

      <nav className="sidebar-nav">
        <a href="#" className="nav-item active">
          <Home size={24} />
          <span>Home</span>
        </a>
        <a href="#" className="nav-item">
          <Search size={24} />
          <span>Search</span>
        </a>
        <a href="#" className="nav-item">
          <Compass size={24} />
          <span>Explore</span>
        </a>
        <a href="#" className="nav-item">
          <MessageCircle size={24} />
          <span>Messages</span>
        </a>
        <a href="#" className="nav-item">
          <Heart size={24} />
          <span>Notifications</span>
        </a>
        <a href="#" className="nav-item">
          <PlusSquare size={24} />
          <span>Create</span>
        </a>
        <a href="#" className="nav-item">
          <User size={24} />
          <span>Profile</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <a href="#" className="nav-item">
          <Menu size={24} />
          <span>More</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
