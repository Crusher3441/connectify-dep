import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'

export default function LandingPage() {

  const router = useNavigate();

  return (
    <div className='landingPageContainer'>
      <nav>
        <div className='navHeader'>
          <h2>Connectify</h2>
        </div>
        <div className='navList'>
          <p onClick={() => {
            router("/123");
          }}>Join as Guest</p>
          <p onClick={() => {
            router("/auth")
          }}>Register</p>
          <div onClick={() => {
            router("/auth")
          }} role='button'>
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>

          <p>Cover a distance by Connectify</p>
          <div role='button' style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div>
          <img src="/original-3a9aba7fb1690ad64f09a38b290b7980.jpeg" alt="" style={{borderRadius:"5%"}}/>
        </div>
      </div>

    </div>
  )
}
