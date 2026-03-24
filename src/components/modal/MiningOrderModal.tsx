import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface MiningOrderModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const MiningOrderModal: React.FC<MiningOrderModalProps> = ({ open, setOpen }) => {
    if (!open) return null;

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/product");
            setOpen(false);
        }, 3000);
    }, []);

    return (
        <div className="fixed inset-0 bg-black/60  flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 text-center">
                {/* Mining Icon/Image */}
                <div className="mb-6 flex justify-center">
                    <div className="relative">
                        {/* You can replace this with an actual image */}
                        <div className="w-24 h-24 bg-gradient-to-br from-teal to-primaryButton rounded-full flex items-center justify-center animate-pulse">
                            <svg
                                className="w-16 h-16"
                                viewBox="0 0 120 120"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="white" stopOpacity="1" />
                                        <stop offset="100%" stopColor="white" stopOpacity="0.2" />
                                    </radialGradient>
                                </defs>

                                {/* Soft glowing core */}
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="16"
                                    fill="url(#glow)"
                                    className="animate-pulse"
                                />

                                {/* Orbit ring */}
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="36"
                                    stroke="rgba(255,255,255,0.35)"
                                    strokeWidth="3"
                                    strokeDasharray="6 10"
                                    className="animate-spin origin-center"
                                    style={{ animationDuration: "3s" }}
                                />

                                {/* Fast accent arc */}
                                <path
                                    d="M60 24
           A36 36 0 0 1 96 60"
                                    stroke="white"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    className="animate-spin origin-center"
                                    style={{ animationDuration: "1s" }}
                                />
                            </svg>

                        </div>
                        {/* Optional: Add spinning effect */}
                        {/* <div className="absolute inset-0 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div> */}
                    </div>
                </div>

                {/* Mining Order Text */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Snatching Order...
                </h2>

                {/* Optional: Loading dots */}
                <div className="flex justify-center gap-1 mt-4">
                    <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
};

export default MiningOrderModal;