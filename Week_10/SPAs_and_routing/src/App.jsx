import {BrowserRouter, Routes, Route, Link, useNavigate, Outlet} from "react-router-dom";
import './App.css';

function App() {
  return <div>

    <a href="/">Homepage</a>
    <a href="/class_11">Class 11</a>
    <a href="/class_12">Class 12</a>
       -- using 'a' tag (Reloads the html page again)

    <br /> <br />

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/class_11" element={<Class11Program />} />
          <Route path="/class_12" element={<Class12Program />} />
          <Route path="/" element={<Landingpage />} />
          <Route path="*" element={<Errorpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
}

function Layout(){
  return <div style={{height:"100vh"}}>
    <Header />
    <div style={{height:"90vh"}}>
      <Outlet />
    </div>
    Footer | Contact us
  </div>
}

function Header(){
  return <>
  <Link to="/">Homepage</Link>
    <Link to="/class_11">Class 11</Link>
    <Link to="/class_12"> Class 12</Link>
    -- using 'Link' from react-router-dom (for single page applications)
  </>
}

function Errorpage(){
  return <div>
    <h1>Sorry Page not found</h1>
  </div>
}

function Landingpage(){
  return <div>
    <h1>Welcome to Landing Page</h1>
    
  </div>
}

function Class11Program(){
  return <div>
    <h1>Program for class 11</h1>
    
  </div>
}

function Class12Program(){
  const navigate = useNavigate();

  function redirectUser(){
    navigate("/");
  }

  return <div>
    <h1>Program for class 12</h1>
    <button onClick={redirectUser}>Go back to landing page</button>
  </div>
}

export default App
