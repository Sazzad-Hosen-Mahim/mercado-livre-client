import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/store/api/auth/authApi";
import CountryCodeSelect from "@/components/Common/CountryCodeSelect";
import { toast } from "sonner";

// Schema and other code remains exactly the same...
const signupSchema = z
  .object({
    phone: z.string().min(8, "Phone number must be at least 8 digits"),
    captcha: z
      .string()
      .min(4, "Enter the 4 digit verification code")
      .max(4, "Enter the 4 digit verification code"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    invitationCode: z.string().optional(),
    email: z.string().email("Invalid email format"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignupFormInputs = z.infer<typeof signupSchema>;

const generateCaptcha = () =>
  Math.floor(1000 + Math.random() * 9000).toString();

const Signup = () => {
  const [captchaCode, setCaptchaCode] = useState<string>(generateCaptcha());
  const [countryCode, setCountryCode] = useState("+880");
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();

  const refreshCaptcha = () => setCaptchaCode(generateCaptcha());

  const onSubmit = async (data: SignupFormInputs) => {
    if (data.captcha !== captchaCode) {
      setError("captcha", {
        type: "manual",
        message: "Verification code does not match",
      });
      return;
    }

    try {
      await registerUser({
        name: data.email.split("@")[0],
        phoneNumber: `${countryCode}${data.phone}`,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        invitationCode: data.invitationCode,
      }).unwrap();
      toast.success("Registration successful");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message);
      console.error("Registration failed", err);
    }
  };

  return (
    <div className="flex justify-center max-w-[500px] mx-auto h-auto scroll-y-auto">
      <div className="w-full p-6 shadow-md">
        <h2 className="text-2xl font-semibold text-center">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          {/* Phone Field - Unchanged */}
          {/* Modern Phone Number Field */}
          <div className="mb-6">
            <label className="block text-md font-medium text-gray-700 mb-3">
              Phone Number
            </label>

            <div className="flex items-center bg-white border border-gray-300 rounded-2xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">

              {/* Country Code Selector */}
              <div className="pl-5 pr-3 border-r border-gray-200">
                <CountryCodeSelect
                  value={countryCode}
                  onChange={setCountryCode}
                />
              </div>

              {/* Phone Input */}
              <input
                type="tel"                    // Changed to tel for better mobile experience
                {...register("phone")}
                placeholder="1XXXXXXXXX"
                className="flex-1 bg-transparent px-4 py-4 text-lg font-medium focus:outline-none placeholder:text-gray-400"
              />
            </div>

            {errors.phone && (
              <p className="text-red-500 text-sm mt-2 ml-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* ==================== MODERN VERIFICATION CODE SECTION ==================== */}
          <div className="mb-6">
            <label className="block text-md font-medium text-gray-700 mb-3">
              Graphic Verification Code
            </label>

            <div className="flex gap-3">
              {/* Input Field */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  {...register("captcha")}
                  placeholder="Enter 4 digit code"
                  maxLength={4}
                  className="w-full h-12 px-5 text-lg tracking-[4px] font-semibold border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Captcha Display + Refresh */}
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 h-12 px-5 flex items-center justify-center rounded-2xl font-mono text-2xl font-bold tracking-widest text-gray-700 shadow-sm select-none min-w-[110px]">
                  {captchaCode}
                </div>

                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="h-12 w-12 flex items-center justify-center bg-white border border-gray-300 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Refresh captcha"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.058 11H1M12 3v2m0 16v2m9-9H15M10 18l-3-3m0 0l3-3" />
                  </svg>
                </button>
              </div>
            </div>

            {errors.captcha && (
              <p className="text-red-500 text-sm mt-2 ml-1">
                {errors.captcha.message}
              </p>
            )}
          </div>
          {/* ==================== END OF MODERN VERIFICATION CODE ==================== */}

          {/* Rest of the form remains completely unchanged */}
          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-3">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-3">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Invitation Code */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-3">
              Invitation Code
            </label>
            <input
              type="text"
              {...register("invitationCode")}
              className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-md font-medium text-gray-700 mb-3">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-mercadoPrimary cursor-pointer text-black/80 text-xl font-bold p-2 rounded-md hover:bg-mercadoPrimary/80 hover:drop-shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;



// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Link, useNavigate } from "react-router-dom";
// import { useRegisterMutation } from "@/store/api/auth/authApi";
// import CountryCodeSelect from "@/components/Common/CountryCodeSelect";
// import { toast } from "sonner";


// // Schema: phone, captcha (4 digits), password, confirmPassword, invitationCode (optional), email
// const signupSchema = z
//   .object({
//     phone: z.string().min(8, "Phone number must be at least 8 digits"),
//     captcha: z
//       .string()
//       .min(4, "Enter the 4 digit verification code")
//       .max(4, "Enter the 4 digit verification code"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string(),
//     invitationCode: z.string().optional(),
//     email: z.string().email("Invalid email format"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Passwords do not match",
//   });

// type SignupFormInputs = z.infer<typeof signupSchema>;

// const generateCaptcha = () =>
//   Math.floor(1000 + Math.random() * 9000).toString();

// const Signup = () => {
//   const [captchaCode, setCaptchaCode] = useState<string>(generateCaptcha());
//   const [countryCode, setCountryCode] = useState("+880");
//   const [registerUser, { isLoading }] = useRegisterMutation();


//   const {
//     register,
//     handleSubmit,
//     setError,
//     formState: { errors },
//   } = useForm<SignupFormInputs>({
//     resolver: zodResolver(signupSchema),
//   });

//   const navigate = useNavigate();

//   const refreshCaptcha = () => setCaptchaCode(generateCaptcha());

//   const onSubmit = async (data: SignupFormInputs) => {
//     if (data.captcha !== captchaCode) {
//       setError("captcha", {
//         type: "manual",
//         message: "Verification code does not match",
//       });
//       return;
//     }

//     try {
//       await registerUser({
//         name: data.email.split("@")[0],
//         phoneNumber: `${countryCode}${data.phone}`,
//         email: data.email,
//         password: data.password,
//         confirmPassword: data.confirmPassword,
//         invitationCode: data.invitationCode,
//       }).unwrap();
//       toast.success("Registration successful");
//       navigate("/login");
//     } catch (err: any) {
//       toast.error(err?.data?.message)
//       console.error("Registration failed", err);
//     }
//   };


//   return (
//     <div className="flex  justify-center max-w-[500px] mx-auto h-auto scroll-y-auto">
//       <div className="w-full p-6 shadow-md">
//         <h2 className="text-2xl font-semibold text-center">Signup</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
//           {/* Phone Field */}
//           <div className="mb-4">
//             <label className="block text-md font-medium text-gray-700 mb-3">
//               Phone
//             </label>
//             <div className="flex items-center border-1 border-gray-400 rounded-md focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
//               <CountryCodeSelect value={countryCode}
//                 onChange={setCountryCode}></CountryCodeSelect>
//               <input
//                 type="number"
//                 {...register("phone")}
//                 placeholder="1XXXXXXXXX"
//                 className="w-full p-2 focus:outline-none"
//               />
//             </div>
//             {errors.phone && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.phone.message}
//               </p>
//             )}
//           </div>

//           {/* Graphic Verification Code */}
//           <div className="mb-4">
//             <label className="block text-md font-medium text-gray-700 mb-3">
//               Verification Code
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 {...register("captcha")}
//                 placeholder="Enter 4 digit code"
//                 maxLength={4}
//                 className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-24"
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2">
//                 <div className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-lg font-semibold mr-2 select-none">
//                   {captchaCode}
//                 </div>
//                 <button
//                   type="button"
//                   onClick={refreshCaptcha}
//                   className="text-sm text-blue-500 underline"
//                 >
//                   Refresh
//                 </button>
//               </div>
//             </div>
//             {errors.captcha && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.captcha.message}
//               </p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div className="mb-4">
//             <label className="block text-md font-medium text-gray-700 mb-3">
//               Password
//             </label>
//             <input
//               type="password"
//               {...register("password")}
//               className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div className="mb-4">
//             <label className="block text-md font-medium text-gray-700 mb-3">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               {...register("confirmPassword")}
//               className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm">
//                 {errors.confirmPassword.message}
//               </p>
//             )}
//           </div>

//           {/* Invitation Code */}
//           <div className="mb-4">
//             <label className="block text-md font-medium text-gray-700 mb-3">
//               Invitation Code
//             </label>
//             <input
//               type="text"
//               {...register("invitationCode")}
//               className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Email */}
//           <div className="mb-6">
//             <label className="block text-md font-medium text-gray-700 mb-3">
//               Email
//             </label>
//             <input
//               type="email"
//               {...register("email")}
//               className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email.message}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-teal text-white text-xl font-bold p-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
//           >
//             {isLoading ? "Registering..." : "Register"}
//           </button>

//         </form>
//         <p className="mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-500">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
