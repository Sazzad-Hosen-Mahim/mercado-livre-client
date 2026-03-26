import React, { useState, useEffect } from "react";
import {
  Menu,
  UserRound,
  Phone,
  CreditCard,
  Calendar,
  History,
  KeyRound,
  HelpCircle,
  Info,
  LogOut,
  X,
  ArrowRight,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import logo from "@/assets/mercado-logo-full.png";
import { MdEvent } from "react-icons/md";
import { MdEmojiEvents } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/store/Slices/AuthSlice/authSlice";
import { useGetSingleUserQuery } from "@/store/api/user/userApi";
import AccountDetailsModal from "@/components/modal/AccountDetailsModal";
import { TbCurrencyTaka } from "react-icons/tb";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [, setIsMobileMenuOpen] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = useAppSelector((state) => state.auth.token);
  const isAuthenticated = !!token || !!localStorage.getItem("accessToken");

  const id = localStorage.getItem("userId");
  const userId = id ? parseInt(id) : 0;
  const { data: userData } = useGetSingleUserQuery(userId, {
    skip: !isAuthenticated || !userId,
    refetchOnMountOrArgChange: true,
  });

  const user = userData?.data;

  const accountDetailsData = {
    name: user?.name || "sajjadhosenmahim",
    userId: user?.userId || 7872843,
    quantityOfOrders: user?.quantityOfOrders || 25,
    userBalance: user?.userBalance || 0,
    memberTotalRecharge: user?.memberTotalRecharge || 0,
    userType: user?.userType || "Normal",
    dailyProfit: user?.dailyProfit || 0,
    outOfBalance: user?.outOfBalance || 0,
    completedOrdersCount: user?.completedOrdersCount || 0,
    trialRoundBalance: user?.trialRoundBalance || 0,
  };

  useEffect(() => {
    setIsOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogOut = () => {
    setIsOpen(false);
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  const handleAccountDetailsClick = () => {
    setIsOpen(false);
    setOpenAccountModal(true);
  };

  return (
    <>
      <nav className="bg-mercadoPrimary shadow-lg w-full relative z-50">
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Menu Trigger */}
            <div className="flex items-center gap-3">
              {isAuthenticated && (
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <button
                      className="p-3 -ml-2 text-black rounded-2xl hover:bg-black/10 active:bg-black/5 transition-all duration-200"
                      aria-label="Open menu"
                    >
                      <Menu className="h-6 w-6" />
                    </button>
                  </SheetTrigger>

                  <SheetContent
                    side="left"
                    className="p-0 w-[300px] sm:w-[340px] border-r  bg-white shadow-2xl 
                               data-[state=open]:animate-in data-[state=closed]:animate-out 
                               data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left 
                               duration-300 ease-out"
                  >
                    <div className="flex flex-col h-full overflow-hidden">
                      {/* Modern Gradient Header */}
                      <div className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-950 px-6 pt-12 pb-9 text-white">
                        <SheetClose className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors">
                          <X className="h-5 w-5" />
                        </SheetClose>

                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 mb-5 shadow-inner">
                            <UserRound className="w-11 h-11 text-white" />
                          </div>
                          <div className="text-2xl font-semibold tracking-tight">
                            {user?.name || "Welcome Back"}
                          </div>
                          <div className="text-sm text-white/70 mt-1">
                            UID: {localStorage.getItem("userId") || "••••••"}
                          </div>
                        </div>

                        <button className="mt-8 w-full bg-white text-black font-semibold py-3.5 rounded-2xl hover:bg-white/95 active:scale-[0.985] transition-all shadow-lg">
                          Cash In
                        </button>
                      </div>

                      {/* Quick Actions */}
                      <div className="px-6 py-8 border-b border-gray-100">
                        <div className="grid grid-cols-3 gap-2">
                          <Link to="/cash-out" onClick={handleMenuItemClick}>
                            <QuickAction icon={<TbCurrencyTaka className="h-6 w-6" />} label="Cash Out" />
                          </Link>
                          <Link to="/contact" onClick={handleMenuItemClick}>
                            <QuickAction icon={<Phone className="h-6 w-6" />} label="Contact" />
                          </Link>
                          <Link to="#" onClick={handleAccountDetailsClick}>
                            <QuickAction icon={<CreditCard className="h-6 w-6" />} label="Account" />
                          </Link>
                        </div>
                      </div>

                      {/* Menu List */}
                      <div className="flex-1 overflow-y-auto py-3">
                        <MenuItem
                          icon={<CreditCard className="h-5 w-5" />}
                          text="Bind Account"
                          to="/bind-account"
                          onClick={handleMenuItemClick}
                        />
                        <MenuItem
                          icon={<Calendar className="h-5 w-5" />}
                          text="Daily Boost"
                          to="/check-in"
                          onClick={handleMenuItemClick}
                        />
                        <MenuItem
                          icon={<History className="h-5 w-5" />}
                          text="History"
                          to="/history"
                          onClick={handleMenuItemClick}
                        />
                        <MenuItem
                          icon={<KeyRound className="h-5 w-5" />}
                          text="Change Password"
                          to="/forgot-password"
                          onClick={handleMenuItemClick}
                        />
                        <MenuItem
                          icon={<HelpCircle className="h-5 w-5" />}
                          text="Help & Support"
                          to="/help"
                          onClick={handleMenuItemClick}
                        />
                        <MenuItem
                          icon={<Info className="h-5 w-5" />}
                          text="About Us"
                          to="/about"
                          onClick={handleMenuItemClick}
                        />
                      </div>

                      {/* Logout */}
                      <div className="p-6 border-t border-gray-100 mt-auto">
                        <button
                          onClick={handleLogOut}
                          className="w-full flex items-center justify-center gap-3 py-4 text-red-600 font-medium border border-red-200 hover:bg-red-50 active:bg-red-100 rounded-2xl transition-all"
                        >
                          <LogOut className="h-5 w-5" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              )}

              <a href="/" className="flex items-center">
                <img src={logo} alt="Logo" className="w-36 h-8" />
              </a>
            </div>

            {/* Right side icons */}
            <div className=" flex items-center gap-1">
              <a href="/event" className="p-3 text-black hover:bg-black/5 rounded-2xl transition-colors">
                <MdEvent className="h-6 w-6" />
              </a>
              <a href="/score" className="p-3 text-black hover:bg-black/5 rounded-2xl transition-colors">
                <MdEmojiEvents className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <AccountDetailsModal
        open={openAccountModal}
        onClose={() => setOpenAccountModal(false)}
        data={accountDetailsData}
      />
    </>
  );
};

// Modern Quick Action
const QuickAction = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center gap-2 p-4 rounded-3xl hover:bg-gray-50 active:bg-gray-100 transition-all cursor-pointer group">
    <div className="w-14 h-14 bg-white shadow border border-gray-100 rounded-2xl flex items-center justify-center text-zinc-700 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <span className="text-xs font-medium text-center text-gray-700">{label}</span>
  </div>
);

// Modern Menu Item with smooth hover
const MenuItem = ({
  icon,
  text,
  to,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  to: string;
  onClick?: () => void;
}) => (
  <Link to={to} onClick={onClick}>
    <div className="group flex items-center gap-4 px-7 py-4 hover:bg-zinc-50 active:bg-zinc-100 border-b border-gray-100 transition-all">
      <div className="text-zinc-600 group-hover:text-violet-600 transition-colors">
        {icon}
      </div>
      <span className="font-medium text-gray-900 flex-1">{text}</span>
      <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-400 transition-colors" />
    </div>
  </Link>
);

export default Navbar;




// import React, { useState, useEffect } from "react";
// import {
//   Menu,
//   User,
//   // DollarSign,
//   Mail,

//   CreditCard,
//   LogIn,
//   HelpCircle,
//   Info,
//   Settings,
// } from "lucide-react";
// import { MdHistory } from "react-icons/md";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import logo from "@/assets/mercado-logo-full.png";
// import "./Navbar.css";
// import { MdEvent } from "react-icons/md";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
// import { logout } from "@/store/Slices/AuthSlice/authSlice";
// import { useGetSingleUserQuery } from "@/store/api/user/userApi";
// import AccountDetailsModal from "@/components/modal/AccountDetailsModal";
// import { TbCurrencyTaka } from "react-icons/tb";
// import { MdEmojiEvents } from "react-icons/md";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [openAccountModal, setOpenAccountModal] = useState(false);

//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get authentication state from Redux
//   const token = useAppSelector((state) => state.auth.token);

//   // Or check localStorage directly (choose one approach)
//   const isAuthenticated = !!token || !!localStorage.getItem("accessToken");

//   // Fetch user data
//   const id = localStorage.getItem("userId");
//   const userId = id ? parseInt(id) : 0;
//   const { data: userData } = useGetSingleUserQuery(userId, {
//     skip: !isAuthenticated || !userId,
//     refetchOnMountOrArgChange: true,
//   });

//   const user = userData?.data;

//   const accountDetailsData = {
//     name: user?.name || "sajjadhosenmahim",
//     userId: user?.userId || 7872843,
//     quantityOfOrders: user?.quantityOfOrders || 25,
//     userBalance: user?.userBalance || 0,
//     memberTotalRecharge: user?.memberTotalRecharge || 0,
//     userType: user?.userType || "Normal",
//     dailyProfit: user?.dailyProfit || 0,
//     outOfBalance: user?.outOfBalance || 0,
//     completedOrdersCount: user?.completedOrdersCount || 0,
//     trialRoundBalance: user?.trialRoundBalance || 0,
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   // Close sheet when route changes
//   useEffect(() => {
//     setIsOpen(false);
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);

//   const handleLogOut = () => {
//     setIsOpen(false);
//     dispatch(logout());
//     navigate("/login", { replace: true });
//   };

//   const handleMenuItemClick = () => {
//     setIsOpen(false);
//   };

//   const handleAccountDetailsClick = () => {
//     setIsOpen(false);
//     setOpenAccountModal(true);
//   };

//   return (
//     <>
//       <nav className="bg-mercadoPrimary shadow-lg w-full relative">
//         <div className="mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo with Conditional Sheet */}
//             <div className="flex items-center justify-center gap-3">
//               {isAuthenticated && (
//                 <Sheet open={isOpen} onOpenChange={setIsOpen}>
//                   <SheetTrigger asChild>
//                     <button
//                       className="text-black cursor-pointer focus:outline-none transition-all duration-200 hover:scale-110 active:scale-95"
//                       aria-label="Open menu"
//                     >
//                       <Menu className="h-6 w-6" />
//                     </button>
//                   </SheetTrigger>
//                   <SheetContent
//                     side="left"
//                     className="custom-sheet-width p-0 z-100 bg-white transition-all duration-300 ease-in-out w-[280px] sm:w-[350px] fixed left-0 top-0 h-full"
//                   >
//                     <div className="flex flex-col h-full">
//                       {/* User Profile Section */}
//                       <div className="flex flex-col items-center pt-8 pb-6 border-b border-gray-200">
//                         <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mb-3">
//                           <User className="w-8 h-8 text-gray-600" />
//                         </div>
//                         <div className="text-lg font-semibold">
//                           {user?.name || "160****052"}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           UID:{localStorage.getItem("userId") || "138334"}
//                         </div>
//                         <button className="mt-4 w-[90%] bg-primaryButton cursor-pointer text-white py-2.5 rounded-md font-medium hover:bg-gray-800 transition-colors">
//                           Cash In
//                         </button>
//                       </div>

//                       {/* Quick Actions Grid */}
//                       <div className="grid grid-cols-3 gap-4 px-6 py-2 border-b border-gray-200">
//                         <Link to="/cash-out">
//                           <button className="flex flex-col items-center cursor-pointer gap-2 hover:opacity-70 transition-opacity">
//                             <div className="w-12 h-12 flex items-center justify-center">
//                               {/* <DollarSign className="w-6 h-6" /> */}
//                               <TbCurrencyTaka className="w-6 h-6" />
//                             </div>
//                             <span className="text-xs text-center">Cash Out</span>
//                           </button>
//                         </Link>
//                         <Link to="/contact">
//                           <button className="flex flex-col items-center cursor-pointer gap-2 hover:opacity-70 transition-opacity">
//                             <div className="w-12 h-12 flex items-center justify-center">
//                               <Mail className="w-6 h-6" />
//                             </div>
//                             <span className="text-xs text-center">
//                               Contact us
//                             </span>
//                           </button>
//                         </Link>

//                         <button
//                           onClick={handleAccountDetailsClick}
//                           className="flex flex-col items-center cursor-pointer gap-2 hover:opacity-70 transition-opacity"
//                         >
//                           <div className="w-12 h-12 flex items-center justify-center">
//                             <CreditCard className="w-6 h-6" />
//                           </div>
//                           <span className="text-xs text-center">
//                             Account details
//                           </span>
//                         </button>
//                       </div>

//                       {/* Menu Items */}
//                       <div className="flex-1 overflow-y-auto">
//                         <Link to="/bind-account" onClick={handleMenuItemClick}>
//                           <MenuItem
//                             icon={<CreditCard className="w-5 h-5" />}
//                             text="Bind Account"
//                           />
//                         </Link>
//                         <Link to="/check-in" onClick={handleMenuItemClick}>
//                           <MenuItem
//                             icon={<LogIn className="w-5 h-5" />}
//                             text="Daily"
//                           />
//                         </Link>
//                         <Link to="/history" onClick={handleMenuItemClick}>
//                           <MenuItem
//                             icon={<MdHistory className="w-5 h-5" />}
//                             text="History"
//                           />
//                         </Link>
//                         <Link
//                           to="/forgot-password"
//                           onClick={handleMenuItemClick}
//                         >
//                           <MenuItem
//                             icon={<Settings className="w-5 h-5" />}
//                             text="Change Password"
//                           />
//                         </Link>
//                         <Link to="/help" onClick={handleMenuItemClick}>
//                           <MenuItem
//                             icon={<HelpCircle className="w-5 h-5" />}
//                             text="Help"
//                           />
//                         </Link>
//                         <Link to="/about" onClick={handleMenuItemClick}>
//                           <MenuItem
//                             icon={<Info className="w-5 h-5" />}
//                             text="About Us"
//                           />
//                         </Link>
//                       </div>

//                       {/* Sign Out Button */}
//                       <div className="p-4 border-t border-gray-200">
//                         <button
//                           className="w-full cursor-pointer py-3 border-2 border-red-500 text-red-500 rounded-md font-medium hover:bg-red-50 transition-colors"
//                           onClick={handleLogOut}
//                         >
//                           Sign Out
//                         </button>
//                       </div>
//                     </div>
//                   </SheetContent>
//                 </Sheet>
//               )}

//               <a
//                 href="/"
//                 className="text-white text-2xl font-bold flex items-center"
//               >
//                 <span className="text-xl">
//                   <img src={logo} alt="Mercado Livre Logo" className="w-36 h-8" />
//                 </span>
//               </a>
//             </div>

//             {/* Desktop Menu */}
//             <div className="hidden md:flex">
//               <a
//                 href="/event"
//                 className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 <MdEvent className="w-6 h-6" />
//               </a>
//               {/* <a
//                 href="/contact"
//                 className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 <MdPermContactCalendar className="w-6 h-6" />
//               </a> */}
//               <a href="/score" className="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
//                 <MdEmojiEvents className="w-6 h-6" />
//                 {/* <span className="text-xs text-center">Score</span> */}
//               </a>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden flex items-center">
//               <button
//                 onClick={toggleMobileMenu}
//                 type="button"
//                 className="text-black hover:text-gray-800 focus:outline-none"
//               >
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   {isMobileMenuOpen ? (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   ) : (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 6h16M4 12h16m-7 6h7"
//                     />
//                   )}
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               {/* <a
//                 href="/"
//                 className="text-black hover:text-white block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
//               >
//                 Home
//               </a> */}
//               {/* <a
//                 href="/about"
//                 className="text-black hover:text-white  block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
//               >
//                 About
//               </a> */}
//               <a
//                 href="/event"
//                 className="text-black hover:text-white  block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
//               >
//                 Event
//               </a>
//               <a
//                 href="/score"
//                 className="text-black hover:text-white  block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
//               >
//                 Score
//               </a>
//               {/* <a
//                 href="/contact"
//                 className="text-black hover:text-white  block hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
//               >
//                 Contact
//               </a> */}
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Account Details Modal */}
//       <AccountDetailsModal
//         open={openAccountModal}
//         onClose={() => setOpenAccountModal(false)}
//         data={accountDetailsData}
//       />
//     </>
//   );
// };

// // Menu Item Component
// const MenuItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
//   return (
//     <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-200 transition-colors">
//       <div className="flex items-center gap-3">
//         <div className="text-gray-700">{icon}</div>
//         <span className="text-gray-900">{text}</span>
//       </div>
//       <span className="text-gray-400 text-xl">+</span>
//     </button>
//   );
// };

// export default Navbar;