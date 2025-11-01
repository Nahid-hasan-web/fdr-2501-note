import { Link, useNavigate } from "react-router";
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { Bounce, toast } from "react-toastify";
export default function RegisterPage() {
  const [formData , setFormData] = useState({email:"" , userName:'' , password:''})
  const navigate = useNavigate()
const auth = getAuth();

  const handelSubmit  = (e)=>{
    e.preventDefault()

    if(!formData.email || !formData.userName || !formData.password) return alert('all filds required')


      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {

          


          updateProfile(auth.currentUser, { displayName:formData.userName})
            .then(() => {
               
              sendEmailVerification(auth.currentUser)
                .then(() => {
                    navigate('/login')
                             toast.info('Otp send to email adress', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                            });
                });


              }).catch((error) => {
                
                });
        })
        .catch((error) => {
          

          const errorCode = error.code;
          const errorMessage = error.message;


          console.log(errorCode)
            if(errorCode == 'auth/email-already-in-use'){
              toast.error('email already exisit', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            }
        });


  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FBFC] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 md:p-10">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-6">
          Create an Account
        </h2>

        {/* Form */}
        <form onSubmit={handelSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-600 text-sm mb-2">Username</label>
            <div className="flex items-center border border-gray-200 rounded-lg bg-[#F9FBFC] px-3 py-2 focus-within:ring-2 focus-within:ring-[#A7E6FF]">
              <FaUserAlt className="text-gray-400 text-sm mr-2" />
              <input
                onChange={(e)=>setFormData((prev)=>({...prev , userName:e.target.value}))}
                type="text"
                placeholder="Enter your username"
                className="w-full bg-transparent focus:outline-none text-gray-700 text-sm md:text-base"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 text-sm mb-2">Email</label>
            <div className="flex items-center border border-gray-200 rounded-lg bg-[#F9FBFC] px-3 py-2 focus-within:ring-2 focus-within:ring-[#A7E6FF]">
              <FaEnvelope className="text-gray-400 text-sm mr-2" />
              <input
                  onChange={(e)=>setFormData((prev)=>({...prev , email:e.target.value}))}
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent focus:outline-none text-gray-700 text-sm md:text-base"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 text-sm mb-2">Password</label>
            <div className="flex items-center border border-gray-200 rounded-lg bg-[#F9FBFC] px-3 py-2 focus-within:ring-2 focus-within:ring-[#A7E6FF]">
              <FaLock className="text-gray-400 text-sm mr-2" />
              <input
                onChange={(e)=>setFormData((prev)=>({...prev , password:e.target.value}))}
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent focus:outline-none text-gray-700 text-sm md:text-base"
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-[#A7E6FF] hover:bg-[#7BD3EA] text-white font-medium py-3 rounded-lg text-sm md:text-base transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#7BD3EA] hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
