import { Link, useNavigate } from "react-router";
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { currentUserData } from "../slice";
export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password)
      return alert("all filds required");
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;

        localStorage.setItem('userInfo' , JSON.stringify(user))
        dispatch(currentUserData(user));

        if (user.emailVerified === false) {
          toast.warning("please verify your email address", {
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
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode) {
          toast.error("Something went wrong", {
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FBFC] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 md:p-10">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-6">
          Wellcome back
        </h2>

        {/* Form */}
        <form onSubmit={handelSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-600 text-sm mb-2">Email</label>
            <div className="flex items-center border border-gray-200 rounded-lg bg-[#F9FBFC] px-3 py-2 focus-within:ring-2 focus-within:ring-[#A7E6FF]">
              <FaEnvelope className="text-gray-400 text-sm mr-2" />
              <input
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
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
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
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
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Dont have an account?{" "}
          <Link
            to="/register"
            className="text-[#7BD3EA] hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
