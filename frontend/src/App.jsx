import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import Footer from "./components/Footer.jsx"
import {Toaster} from "react-hot-toast";
import { useAuthStore } from "../store/authUser.js"
import { Navigate } from "react-router-dom"
import { Loader } from "lucide-react"

const App = () =>{
  const {user , isAuthenticated,  authCheck} = useAuthStore();
  console.log("Auth App.js" , user);

  useEffect(() =>{
    authCheck();
  } , [authCheck])

  if(isAuthenticated){
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage />: <Navigate to={"/"}/>} />
        <Route path="/signup" element={!user ? <SignUpPage/> : <Navigate to={"/"}/>} />
      </Routes>
      <Footer/>
      <Toaster position="top-center"/>
    </>
  );
}

export default App;
