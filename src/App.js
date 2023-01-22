import React from 'react'
import { HashRouter as Brouter, Routes, Route } from "react-router-dom";
import './index.css';
//import components:
import ProjectDetails from "./projectsComponents/ProjectDetails";
//import pages:
import Header from "./Header"
import Projects from './projectsComponents/Projects';
import NP from './NPComponents/NP';
//import submission:
import Submission from './NPComponents/Submission';


function App() {

  return (
    <div className='app'>
      <Brouter>
        <Header />
        <Routes>

          {/* Routing for main pages */}
          <Route path='/' exact element={<Projects />} />

          {/* Routing for Projects components */}
          {/* from ProjectOutput to ProjectDetails */}
          <Route path='/projects/:id' element={<ProjectDetails />} />

          {/* Routing for NP Pages */}
          <Route path='/NP' element={<NP />} />

          {/* Routing for Submission */}
          <Route path='/Submission' element={<Submission />} />

        </Routes>
      </Brouter>
    </div>
  );
}

export default App;
