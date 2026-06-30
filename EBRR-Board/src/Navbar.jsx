import './Navbar.css'

export default function NavBar() {
    return (    
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-image">
            <i></i>
        </div>
        <div className="logo-text">
          <span className="logo-title">EBRR</span>
          <span className="logo-subtitle">EXAMINATION BOARD</span>
        </div>
      </div>
      <ul className="navbar-links">
        <li>Home</li>
        <li>Admissions</li>
        <li>News & Publications</li>
        <li className="nav-active">Examination Results</li>
      </ul>
      <button className="navbar-btn">Contact Us</button>
    </nav>
    )
}