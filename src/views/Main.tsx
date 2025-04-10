import React, { useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import '../App.css';
import kuva from '../kuva.png';
import '../styles.css';

const Main = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  return (
    <div style={{ backgroundImage: `url(${kuva})`, backgroundRepeat: 'no-repeat' , maxHeight: screenHeight,  minHeight: screenHeight , height: '100vh', backgroundSize: '100% 100%',  width: '100vw' }}>
        <div style={{ display:'flex', flexDirection: 'row', justifyContent: 'flex-end', width:'100%', height: '5%'}}>
          <div style={{marginRight: '5%'}}>
            <NavLink
              to="/admin"
            >
              <h5> Admin</h5>
            </NavLink>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '90%'}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems:'center', height: '100%', width: '100%', justifyContent: 'center' }}>
            <div style={{ height:'100%', width: '60%'}}>
              <h1 style={{color:'white'}}>Kalevan kisat 2024</h1>
              <h2><p><span>Ilmoittautuminen</span><span>Anmälan</span></p> </h2>
              <hr></hr>
              <h3 style={{color:'white'}}>
                <p>
                  <span style={{fontSize: 13}}> Ilmoittaudu tässä Vaasan 2024 Kalevan kisojen vapaaehtoiseksi toimitsijaksi. Saat kuittauksen ilmoittautumisesta annettuun sähköpostiin. Otamme sinuun yhteyttä. Tervetuloa mukaan! </span>
                  <span style={{fontSize: 13}}> Här anmäler Du dig som frivillig funktionär till Kalevan kisat 2024 i Vasa. Du får en kvittering på gjord anmälan till den epost som angivits. Vi kontaktar Dig. Välkommen med!</span>
                </p>
              </h3>
              <button className="dynamic-button">
                <NavLink
                    to="/registration"
                    style={{ textDecoration: 'none'}}
                >
                  <p style={{fontSize: 13, textAlign: 'center'}}>Ilmoittautuminen | Anmälan </p>
                </NavLink>
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Main;
