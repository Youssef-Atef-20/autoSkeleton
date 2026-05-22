import { useState, useEffect } from 'react';
import AutoSkeleton from './components/AutoSkeleton';
import './App.css';

// --- SAMPLE COMPONENT 1: PRODUCT CARD ---
function ProductCard({ rating = 4.8, reviews = 124 }) {
  // Use hooks to make sure dispatcher mocking works with functional hooks
  const [isLiked, setIsLiked] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="demo-card product-card">
      <div className="product-img-wrapper">
        <span className="product-badge">New Release</span>
        {/* Simple decorative SVG for visual wow factor */}
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </div>
      <div className="product-details">
        <span className="product-tag">Audio & Sound</span>
        <h3 className="product-title">SonicPro Wireless Headphones</h3>
        
        <div className="product-rating">
          <span style={{ color: '#fbbf24' }}>★ ★ ★ ★ ★</span>
          <span>{rating} ({reviews} reviews)</span>
        </div>

        <div className="product-price-row">
          <span className="product-price">$249.99</span>
          <span className="product-price-old">$299.99</span>
        </div>

        <button 
          className="btn-product-buy"
          onClick={() => {
            setCartCount(prev => prev + 1);
            setIsLiked(true);
          }}
        >
          Add to Cart {cartCount > 0 ? `(${cartCount})` : ''}
        </button>
      </div>
    </div>
  );
}

// --- SAMPLE COMPONENT 2: PROFILE CARD ---
function ProfileCard({ name = "Sarah Jenkins", handle = "@sarah_j" }) {
  const [followers, setFollowers] = useState(14820);
  const [following, setFollowing] = useState(942);
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    if (isFollowing) {
      setFollowers(f => f - 1);
    } else {
      setFollowers(f => f + 1);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="demo-card profile-card">
      <div className="profile-cover"></div>
      <div className="profile-avatar-container">
        {/* Generates a nice circular SVG profile avatar */}
        <svg className="profile-avatar" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="50" fill="#cbd5e1" />
          <circle cx="50" cy="38" r="18" fill="#475569" />
          <path d="M15 88C15 70 30.7 58 50 58C69.3 58 85 70 85 88" fill="#475569" />
        </svg>
      </div>
      <div className="profile-info">
        <h3 className="profile-name">{name}</h3>
        <span className="profile-handle">{handle}</span>
        <p className="profile-bio">
          Senior Product Designer based in San Francisco. Building modern digital experiences, 
          focusing on fluid interactions and high-quality visuals.
        </p>

        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{followers.toLocaleString()}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{following.toLocaleString()}</span>
            <span className="stat-label">Following</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">284</span>
            <span className="stat-label">Shots</span>
          </div>
        </div>

        <div className="profile-actions">
          <button 
            className="btn-profile-follow"
            onClick={toggleFollow}
            style={isFollowing ? { background: '#10b981' } : {}}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
          <button className="btn-profile-msg">Message</button>
        </div>
      </div>
    </div>
  );
}

// --- SAMPLE COMPONENT 3: DASHBOARD STAT CARD ---
function DashboardCard({ title = "Active Workspace Users" }) {
  const [value, setValue] = useState(14852);

  // Hook to simulate fluctuating values
  useEffect(() => {
    const interval = setInterval(() => {
      setValue(v => v + Math.floor(Math.random() * 21) - 10);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="demo-card stat-card">
      <div className="stat-header">
        <div>
          <span className="stat-title">{title}</span>
          <h2 className="stat-number">{value.toLocaleString()}</h2>
        </div>
        <div className="stat-icon-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
      </div>
      
      <div className="stat-trend up">
        <span>▲ +14.2%</span>
        <span className="stat-trend-label">since last week</span>
      </div>

      <div className="stat-chart-placeholder">
        {/* Simple decorative sparkline chart using SVG */}
        <svg width="100%" height="100%" viewBox="0 0 300 60" preserveAspectRatio="none">
          <path 
            d="M0,50 Q40,30 80,45 T160,20 T240,40 T300,10" 
            fill="none" 
            stroke="url(#sparkline-grad)" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="sparkline-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

// --- MAIN PLAYGROUND APP ---
function App() {
  const [loading, setLoading] = useState(true);
  const [animation, setAnimation] = useState('shimmer');
  const [duration, setDuration] = useState(1.5);
  const [theme, setTheme] = useState('light');
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive' or 'comparison'

  // Apply global dark theme body classes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">AutoSkeleton Loader</h1>
        <p className="app-subtitle">
          Instantly transform any React component tree into a matching, high-fidelity loading skeleton loader. 
          Zero manual design, 100% layout preservation.
        </p>
      </header>

      {/* Control Configuration Panel */}
      <section className="controls-panel">
        <div className="control-group">
          <button 
            className={`btn-toggle-loading ${loading ? 'active' : ''}`}
            onClick={() => setLoading(!loading)}
          >
            {loading ? 'State: Loading...' : 'State: Loaded'}
          </button>
        </div>

        <div className="control-group">
          <label className="control-label">Animation</label>
          <select 
            className="control-select" 
            value={animation}
            onChange={(e) => setAnimation(e.target.value)}
          >
            <option value="shimmer">Shimmer</option>
            <option value="pulse">Pulse</option>
            <option value="wave">Wave</option>
            <option value="none">None</option>
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Speed ({duration}s)</label>
          <input 
            type="range" 
            min="0.5" 
            max="3" 
            step="0.1"
            className="control-input-range"
            value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label className="control-label">View</label>
          <select 
            className="control-select" 
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
          >
            <option value="interactive">Interactive Preview</option>
            <option value="comparison">Side-by-Side Comparison</option>
          </select>
        </div>

        <div className="control-group">
          <button 
            className="btn-icon-mode"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            title="Toggle Light/Dark Theme"
          >
            {theme === 'light' ? (
              /* Moon icon */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              /* Sun icon */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
        </div>
      </section>

      {/* Main Workspace */}
      <main className="playground-workspace">
        {viewMode === 'interactive' ? (
          <div className="workspace-section">
            <h2 className="section-title">Playground Preview</h2>
            <div className="grid-layout">
              <AutoSkeleton loading={loading} animation={animation} duration={duration} theme={theme}>
                <ProductCard />
                <ProfileCard />
                <DashboardCard />
              </AutoSkeleton>
            </div>
          </div>
        ) : (
          <div className="workspace-section">
            <h2 className="section-title">Side-by-Side Comparison</h2>
            <div className="comparison-container">
              {/* Left side: Original rendered component */}
              <div className="comparison-column">
                <h3 className="column-header">Original UI (Loaded)</h3>
                <ProductCard />
                <ProfileCard />
                <DashboardCard />
              </div>
              
              {/* Right side: Skeleton rendered representation */}
              <div className="comparison-column">
                <h3 className="column-header">Skeleton UI (Loading)</h3>
                <AutoSkeleton loading={true} animation={animation} duration={duration} theme={theme}>
                  <ProductCard />
                  <ProfileCard />
                  <DashboardCard />
                </AutoSkeleton>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
