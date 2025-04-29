
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import About from "./components/About/About";



import Navbar from "./components/Nav_Bar/Navbar";

import Testimonail from "./components/Testimonial/Testimonail";
import Team from "./components/Team/Team.js";
import Contact from "./components/Contact/Contact.js";
import Blog from "./components/Blog/Blog.js";
import Footer from "./components/Footer/Footer.js";
import BackToTopButton from "./components/BackToTop/Backtotop.js";

import Addteam from "./Admin_Components/AllHomePages/Form/TeamForm/Addteam.js";
import Teamtable from "./Admin_Components/AllHomePages/Table/TeamTable/Teamtable.js";
import Editteamform from "./Admin_Components/AllHomePages/Form/TeamForm/Editteamform.js";
import Achivement from "./components/Achivement/Achivement.js";
import AchivementForm from "./Admin_Components/AllHomePages/Form/Achivement/AchivementForm.js";
import Achivetable from "./Admin_Components/AllHomePages/Table/AchiveTable/Achivetable.js";
import CertificateForm from "./Admin_Components/AllHomePages/Form/Certificate/AddCertificate.js";
import Certificatetable from "./Admin_Components/AllHomePages/Table/CertificateTable/Certificatetable.js";
import ShowCertificate from "./components/ShowCertificateByQRCode/ShowCertificate.js";
import AddEventForm from "./Admin_Components/AllHomePages/Form/Event/AddEventForm.js";
import Eventtable from "./Admin_Components/AllHomePages/Table/EventTable/EventTable.js";
import CountdownBar from "./components/CountDownBar/Countdown.js";
import CountdownTable from "./Admin_Components/AllHomePages/Table/CountdownTable/CountdownTable.js";
import Countdown from "./Admin_Components/AllHomePages/Form/CountDown/Countdown.js";
import Abouttable from "./Admin_Components/AllHomePages/Table/AboutTable/AboutTable.js";
import AboutForm from "./Admin_Components/AllHomePages/Form/About/AboutForm.js";
import Testimonialtable from "./Admin_Components/AllHomePages/Table/TestimonialTable/TestimonialTable.js";
import Addtestimoinal from "./Admin_Components/AllHomePages/Form/Testimonial/TestimonialForm.js";
import ServiceForm from "./Admin_Components/AllHomePages/Form/Service/AddServiceForm.js";
import ServiceTable from "./Admin_Components/AllHomePages/Table/ServiceTable/ServiceTable.js";
import Services from "./components/Services/Services.js";
import UpperHeader from "./components/UpperHeader/UpperHeader.js";
import UpperHeaderForm from "./Admin_Components/AllHomePages/Form/UpperHeader/Upperheaderform.js";
import UpperHeaderTable from "./Admin_Components/AllHomePages/Table/UpperHeaderTable/UpperheaderTable.js";

import Sliders from "./components/Sliders/Sliders.js";
import { Login } from "./Admin_Components/Services/Login/AdminLogin.js";
import FooterForm from "./Admin_Components/AllHomePages/Form/FooterForm/FooterForm.js";
import FooterTable from "./Admin_Components/AllHomePages/Table/FooterTable/FooterTable.js";
import Slidertable from "./Admin_Components/AllHomePages/Table/SliderTable/SliderTable.js";
import Addslider from "./Admin_Components/AllHomePages/Form/SliderForm/SliderForm.js";
import { Loader } from "./components/Loader/Loader.js";
import AdminNavbar from "./components/Admin_Nav/Navbar.js";
import { UpdatePass } from "./Admin_Components/Services/Login/EditLogin.js";
import AddAllEventForm from "./Admin_Components/AllHomePages/Form/Event/AddAllEventForm.js";
import SubEventForm from "./Admin_Components/AllHomePages/Form/Event/SubEventForm.js";
import SubEventTable from "./Admin_Components/AllHomePages/Table/SubEventTable/SubEvent.js";
import Subevent from "./components/Subevent/Subevents.js";
import OneViewEvent from "./components/Subevent/OneViewEvent.js";


import "./App.css";
import Addadvisor from "./Admin_Components/AllHomePages/Form/AdvisorForEventForm/AddAdvisor.js";
import AdvisorForEventTable from "./Admin_Components/AllHomePages/Table/AdvisorForEventTable/AdvisorForEventTable.js";
import AdSlider from "./components/Advertisement/Advertisement.js";
import AdvertisementTable from "./Admin_Components/AllHomePages/Table/AdvertisementTable/AdvertisementTable.js";
import AdvertisementForm from "./Admin_Components/AllHomePages/Form/AdvertisementForm/AdvertisementForm.js";

function App() {


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    // Check if cookie exists by making a backend call
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:5000/api/admin/protected", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 800); // Delay for 1 second
      }
    };

    checkAuth();
  }, []);



  if (loading) {
    return <Loader />; // Show loader while loading
  }

  return (


    <Router>
      <div className="App">
        <Routes>
          {/* User Routes */}
          <Route
            path="/"
            element={
              <>
                <UpperHeader />
                <Navbar />
                <Sliders />
                <AdSlider />
                <About />
                <CountdownBar />
                <Team />
                <Services />
                <Testimonail />

                <Achivement />


                <Contact />
                <Blog />
                <Footer />
                <BackToTopButton />
              </>
            }
          />

          <Route
            path="/team"
            element={
              <>
                <UpperHeader />
                <Navbar />
                <Sliders />
                <Team />
                <Footer />
              </>
            }
          />
          <Route
            path="/event"
            element={
              <>
                <UpperHeader />
                <Navbar />
                <Sliders />
                <Blog />
                <Footer />
              </>
            }
          />
          <Route
            path="/subevent"
            element={
              <>
                <UpperHeader />
                <Navbar />
                <Sliders />
                <Subevent />
                <Footer />
              </>
            }
          />
          <Route
            path="/subevent/oneevent"
            element={
              <>
                <UpperHeader />
                <UpperHeader />
                <Navbar />
                <Sliders />
                <OneViewEvent />
                <Footer />
              </>
            }
          />




          <Route
            path="/about"
            element={
              <>
                <UpperHeader />
                <Navbar />
                <Sliders />
                <About />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <> 
                <UpperHeader />
                <Navbar />
                <Sliders />
                <Contact />
                <Footer />
              </>
            }
          />


          <Route
            path="/service"
            element={
              <>
                <UpperHeader />
                <Navbar />
                <Sliders />
                <Services />
                <Footer />
              </>
            }
          />

          <Route
            path="/achivement"
            element={
              <>
                <UpperHeader />
                <Navbar />
                <Sliders />
                <Achivement />
                <Footer />
              </>
            }
          />


          <Route
            path="/testimonial"
            element={
              <>
                <UpperHeader />
                <Navbar />
                <Sliders />
                <Testimonail />
                <Footer />
              </>
            }
          />



          {/* Admin Route */}

          <Route
            path="/show/:code"
            element={
              <>
              <UpperHeader />
                <Navbar />
                <Sliders />
                <ShowCertificate />
                <Footer />
              </>
            }
          ></Route>

          <Route
            path="/adminDRC"
            element={
              isAuthenticated ? (
                <>

                  <AdminNavbar />
                  <Sliders />
                  <UpperHeaderTable />
                  <Slidertable />
                  <AdvertisementTable />
                  <Abouttable />
                  <CountdownTable />
                  <Teamtable />
                  <ServiceTable />
                  <Testimonialtable />
                  <Eventtable />
                  <SubEventTable />
                  <AdvisorForEventTable />
                  
                  <Achivetable />
                  <Certificatetable />
                  
                  <FooterTable />
                  


                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <Navigate to="/adminDRC" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/admin" />
              ) : (
                <Login onLogin={() => setIsAuthenticated(true)} />
              )
            }
          />

          <Route
            path="/admin/changepassword"
            element={
              <UpdatePass />
            }
          />

          <Route
            path="/admin/team/addteam"
            element={
              isAuthenticated ? (
                <>
                  <AdminNavbar />
                  <Sliders />
                  <Addteam />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>

          <Route
            path="/admin/advertisement/add"
            element={
              isAuthenticated ? (
                <>
                  <AdminNavbar />
                  <Sliders />
                  <AdvertisementForm />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>

          <Route
            path="/admin/achive/addachive"
            element={
              isAuthenticated ? (
                <>
                  <AdminNavbar />
                  <Sliders />
                  <AchivementForm />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>


          <Route
            path="/admin/advisorforevent/addadvisor"
            element={
              isAuthenticated ? (
                <>
                  <AdminNavbar />
                  <Sliders />
                  <Addadvisor />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>




          <Route
            path="/admin/team/editteam"
            element={
              isAuthenticated ? (
                <>
                  <AdminNavbar />
                  <Sliders />
                  <Editteamform />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>

          <Route
            path="/admin/certificate/addcertificate"
            element={
              isAuthenticated ? (
                <>
                  <AdminNavbar />
                  <Sliders />
                  <CertificateForm />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>

          <Route
            path="/admin/event/addevent"
            element={
              isAuthenticated ? (
                <>
                  <AdminNavbar />
                  <Sliders />
                  <AddEventForm />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>


          <Route
            path="/admin/event/subevent"
            element={
              isAuthenticated ? (
                <>
                  <AdminNavbar />
                  <Sliders />
                  <SubEventForm />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>



          <Route
            path="/admin/countdown/addcountdown"
            element={
              isAuthenticated ? (
                <>
                  <AdminNavbar />
                  <Sliders />
                  <Countdown />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>

          <Route
            path="/admin/about/addAbout"
            element={
              isAuthenticated ? (
                <>
                  <AdminNavbar />
                  <Sliders />
                  <AboutForm />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>

          <Route
            path="/admin/testimonial/addtestimonial"
            element={
              isAuthenticated ? (
                <>
                  <AdminNavbar />
                  <Sliders />
                  <Addtestimoinal />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>

          <Route
            path="/admin/service/addservice"
            element={
              isAuthenticated ? (
                <>
                  <AdminNavbar />
                  <Sliders />
                  <ServiceForm />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>

          <Route
            path="/admin/upperheader/addupperheader"
            element={
              isAuthenticated ? (
                <>
                  <AdminNavbar />
                  <Sliders />
                  <UpperHeaderForm />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>

          <Route
            path="/admin/footer/addfooter"
            element={
              isAuthenticated ? (
                <>
                  <AdminNavbar />
                  <Sliders />
                  <FooterForm />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>

          <Route
            path="/admin/slide/addslide"
            element={
              isAuthenticated ? (
                <>
                  <AdminNavbar />
                  <Sliders />
                  <Addslider />

                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          ></Route>






        </Routes>
      </div>
    </Router>
  );
}

export default App;
