import moneyBag from "@/assets/money-bag.png";
import { useGetSingleUserQuery } from "@/store/api/user/userApi";
import { useClaimCheckInRewardMutation } from "@/store/api/user/userApi";
import { LuLock, LuGift, LuCalendarCheck } from "react-icons/lu";
import { toast } from "sonner";

// Define reward structure with required amount (numeric) and day number
const rewards = [
    { day: "Day 1", amount: "৳500", numericAmount: 300, dayNum: 1 },
    { day: "Day 2", amount: "৳700", numericAmount: 500, dayNum: 2 },
    { day: "Day 3", amount: "৳1200", numericAmount: 700, dayNum: 3 },
    { day: "Day 4", amount: "৳1800", numericAmount: 900, dayNum: 4 },
    { day: "Day 5", amount: "৳2500", numericAmount: 1100, dayNum: 5 },
    { day: "Day 6", amount: "৳4000", numericAmount: 1300, dayNum: 6 },
    { day: "Day 7", amount: "৳2000", numericAmount: 2000, dayNum: 7 },
];

export default function CheckIn() {
    const id = localStorage.getItem("userId");
    const userId = id ? parseInt(id) : 0;

    const { data: userData, isLoading } = useGetSingleUserQuery(userId, {
        skip: !userId,
        refetchOnMountOrArgChange: true,
    });

    const [claimReward, { isLoading: isClaiming }] = useClaimCheckInRewardMutation();

    const orderCount = userData?.data?.orderCountForCheckIn ?? 0;
    const totalCheckIns = userData?.data?.dailyCheckInReward?.totalCheckIns ?? 0;

    // Check if user has completed 41 orders to unlock the check-in feature
    const hasCompletedRequiredOrders = orderCount >= 41;

    const handleClaim = async (dayNum: number, amount: number) => {
        if (isClaiming) return;

        try {
            const response = await claimReward({
                userId,
                checkInAmount: amount,
            }).unwrap();

            toast.success(response?.message || "Daily Boost reward added successfully");
            console.log(`Claimed day ${dayNum} → ৳${amount}`);
        } catch (err: any) {
            console.error("Claim failed:", err);
            const errorMessage = err?.data?.message || "Failed to claim reward";
            toast.error(errorMessage);
        }
    };

    if (isLoading) {
        return <div className="text-center py-10 text-gray-500">Loading daily boost...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 pb-12">
            {/* Hero Section - Kept as requested with enhanced modern overlay */}
            <div className="relative">
                <div className="rounded-b-3xl overflow-hidden relative bg-[url('/src/assets/check-in/checkin.jpg')] h-[320px] bg-cover bg-center flex items-center justify-center shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
                    <div className="relative z-10 text-center px-6 max-w-md">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-1.5 rounded-3xl mb-4 border border-white/20">
                            <LuGift className="text-white text-xl" />
                            <span className="text-white text-sm font-medium tracking-widest">DAILY BOOST</span>
                        </div>
                        <h2 className="text-5xl font-semibold text-white tracking-tighter mb-3">Daily Boost</h2>
                        <p className="text-white/80 text-lg">Claim rewards every day. Build your streak.</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mt-[-50px] mx-auto max-w-5xl px-4">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-white p-8">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <h3 className="font-semibold text-3xl text-gray-900 tracking-tight">Daily Rewards</h3>
                            <p className="text-gray-500 mt-1">Complete your streak and unlock bigger rewards</p>
                        </div>

                        <div className="flex items-center gap-3 bg-zinc-100 px-5 py-2.5 rounded-2xl">
                            <div className="text-right">
                                <p className="text-xs text-gray-500">Progress</p>
                                <p className="font-semibold text-lg text-emerald-600">{totalCheckIns}/7</p>
                            </div>
                            <div className="h-11 w-11 rounded-2xl bg-emerald-100 flex items-center justify-center">
                                <LuCalendarCheck className="text-emerald-600 text-2xl" />
                            </div>
                        </div>
                    </div>

                    {/* Rewards Grid - Modern elegant cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {rewards.map((item) => {
                            // Day is claimed if it's less than or equal to totalCheckIns
                            const isClaimed = item.dayNum <= totalCheckIns;

                            // Day is unlocked if:
                            // 1. User has completed 41 orders AND
                            // 2. This is the next day to claim (totalCheckIns + 1)
                            const isUnlocked = hasCompletedRequiredOrders && item.dayNum === totalCheckIns + 1;

                            // Day is locked if it's beyond the next claimable day
                            const isLocked = item.dayNum > totalCheckIns + 1;

                            return (
                                <RewardItem
                                    key={item.dayNum}
                                    {...item}
                                    isClaimed={isClaimed}
                                    isUnlocked={isUnlocked}
                                    isLocked={isLocked}
                                    hasCompletedRequiredOrders={hasCompletedRequiredOrders}
                                    onClaim={() => handleClaim(item.dayNum, item.numericAmount)}
                                    isClaiming={isClaiming}
                                />
                            );
                        })}
                    </div>

                    {!hasCompletedRequiredOrders && (
                        <div className="mt-8 text-center text-sm text-amber-600 bg-amber-50 border border-amber-100 px-6 py-4 rounded-2xl">
                            Complete <span className="font-semibold">41 orders</span> to unlock the full Daily Boost streak
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

interface RewardItemProps {
    day: string;
    amount: string;
    numericAmount: number;
    dayNum: number;
    isClaimed?: boolean;
    isUnlocked?: boolean;
    isLocked?: boolean;
    hasCompletedRequiredOrders?: boolean;
    isClaiming?: boolean;
    onClaim: () => void;
}

function RewardItem({
    day,
    amount,
    isClaimed = false,
    isUnlocked = false,
    isLocked = false,
    hasCompletedRequiredOrders = false,
    isClaiming = false,
    onClaim,
}: RewardItemProps) {

    const handleClick = () => {
        // Can't click if already claimed or currently claiming
        if (isClaimed || isClaiming) return;

        // If not unlocked, show appropriate message
        if (!isUnlocked) {
            if (!hasCompletedRequiredOrders) {
                toast.info("Complete 41 orders to unlock check-in rewards");
            } else if (isLocked) {
                toast.info("Complete previous days first");
            }
            return;
        }

        // Claim the reward
        onClaim();
    };

    return (
        <div className="group relative">
            <button
                type="button"
                onClick={handleClick}
                disabled={isClaimed || isClaiming || !isUnlocked}
                className={`
                    w-full h-full relative flex flex-col items-center gap-6 p-8 rounded-3xl transition-all duration-300 overflow-hidden
                    ${isClaimed
                        ? "bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 shadow-inner"
                        : isUnlocked
                            ? "bg-white border border-violet-200 hover:border-violet-300 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.985] shadow-xl cursor-pointer"
                            : "bg-zinc-100 border border-zinc-200 cursor-not-allowed"}
                `}
            >
                {/* Subtle shine effect for unlocked cards */}
                {isUnlocked && !isClaimed && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                )}

                {/* LOCK OVERLAY */}
                {(isLocked || !hasCompletedRequiredOrders) && !isClaimed && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-3xl">
                        <div className="bg-white/90 p-4 rounded-2xl shadow">
                            <LuLock className="text-zinc-700 text-4xl" />
                        </div>
                    </div>
                )}

                {/* Icon Container */}
                <div
                    className={`
                        relative flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300
                        ${isClaimed
                            ? "bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-300/50"
                            : isUnlocked
                                ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-xl shadow-violet-300/60 group-hover:scale-110"
                                : "bg-zinc-200"}
                    `}
                >
                    {isClaimed ? (
                        <span className="text-white text-5xl drop-shadow">🏆</span>
                    ) : (
                        <div className="relative">
                            <img
                                src={moneyBag}
                                alt="reward"
                                className={`h-11 w-11 transition-all ${isUnlocked ? "drop-shadow-lg" : "grayscale opacity-75"}`}
                            />
                            {isUnlocked && (
                                <div className="absolute -top-1 -right-1 h-5 w-5 bg-white rounded-full flex items-center justify-center shadow">
                                    <span className="text-amber-500 text-[13px]">★</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="text-center space-y-1.5 w-full">
                    <div className="font-semibold text-xl text-gray-900 tracking-tighter">
                        {day}
                    </div>

                    <div
                        className={`text-2xl font-bold tracking-tighter transition-colors
                            ${isClaimed
                                ? "text-emerald-600"
                                : isUnlocked
                                    ? "text-violet-600"
                                    : "text-zinc-400"}`}
                    >
                        {isClaimed ? "Claimed ✓" : amount}
                    </div>
                </div>

                {/* Claimed ribbon */}
                {isClaimed && (
                    <div className="absolute top-6 right-6 rotate-12 bg-emerald-600 text-white text-[10px] font-bold px-4 py-px tracking-widest rounded shadow">
                        CLAIMED
                    </div>
                )}
            </button>
        </div>
    );
}



// import moneyBag from "@/assets/money-bag.png";
// import { useGetSingleUserQuery } from "@/store/api/user/userApi";
// import { useClaimCheckInRewardMutation } from "@/store/api/user/userApi";
// import { BsFileLock } from "react-icons/bs";
// import { toast } from "sonner";

// // Define reward structure with required amount (numeric) and day number
// const rewards = [
//     { day: "1 Day", amount: "৳500", numericAmount: 300, dayNum: 1 },
//     { day: "2 Day", amount: "৳700", numericAmount: 500, dayNum: 2 },
//     { day: "3 Day", amount: "৳1200", numericAmount: 700, dayNum: 3 },
//     { day: "4 Day", amount: "৳1800", numericAmount: 900, dayNum: 4 },
//     { day: "5 Day", amount: "৳2500", numericAmount: 1100, dayNum: 5 },
//     { day: "6 Day", amount: "৳4000", numericAmount: 1300, dayNum: 6 },
//     { day: "7 Day", amount: "৳2000", numericAmount: 2000, dayNum: 7 },
// ];

// export default function CheckIn() {
//     const id = localStorage.getItem("userId");
//     const userId = id ? parseInt(id) : 0;

//     const { data: userData, isLoading } = useGetSingleUserQuery(userId, {
//         skip: !userId,
//         refetchOnMountOrArgChange: true,
//     });

//     const [claimReward, { isLoading: isClaiming }] = useClaimCheckInRewardMutation();

//     const orderCount = userData?.data?.orderCountForCheckIn ?? 0;
//     const totalCheckIns = userData?.data?.dailyCheckInReward?.totalCheckIns ?? 0;

//     // Check if user has completed 41 orders to unlock the check-in feature
//     const hasCompletedRequiredOrders = orderCount >= 41;

//     const handleClaim = async (dayNum: number, amount: number) => {
//         if (isClaiming) return;

//         try {
//             const response = await claimReward({
//                 userId,
//                 checkInAmount: amount,
//             }).unwrap();

//             toast.success(response?.message || "Daily Boost reward added successfully");
//             console.log(`Claimed day ${dayNum} → ৳${amount}`);
//         } catch (err: any) {
//             console.error("Claim failed:", err);
//             const errorMessage = err?.data?.message || "Failed to claim reward";
//             toast.error(errorMessage);
//         }
//     };

//     if (isLoading) {
//         return <div className="text-center py-10">Loading...</div>;
//     }

//     return (
//         <div>
//             {/* Hero Section */}
//             <div className="">
//                 <div className="rounded-b-lg relative bg-[url('/src/assets/check-in/checkin.jpg')] h-[280px] bg-cover bg-center flex items-center justify-center">
//                     <div className="rounded-b-lg absolute inset-0 bg-black/45" />
//                     <div className="relative z-10 mx-8 px-4 py-10 max-w-2xl rounded-lg shadow-xl text-center">
//                         <h2 className="text-4xl text-white font-semibold mb-5">Daily Boost</h2>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="mt-5 mx-auto rounded-xl bg-white p-5 shadow">
//                 <div className="flex items-center justify-between mb-5">
//                     <h3 className="font-semibold text-gray-800">Daily Boost</h3>
//                     {/* <p className="text-sm text-gray-600">
//                         Orders: {orderCount}/41 {!hasCompletedRequiredOrders && "(Complete 41 orders to unlock)"}
//                     </p> */}
//                 </div>

//                 {/* Rewards Grid */}
//                 <div className="flex flex-col gap-6">
//                     <div className="grid grid-cols-4 gap-2">
//                         {rewards.map((item) => {
//                             // Day is claimed if it's less than or equal to totalCheckIns
//                             const isClaimed = item.dayNum <= totalCheckIns;

//                             // Day is unlocked if:
//                             // 1. User has completed 41 orders AND
//                             // 2. This is the next day to claim (totalCheckIns + 1)
//                             const isUnlocked = hasCompletedRequiredOrders && item.dayNum === totalCheckIns + 1;

//                             // Day is locked if it's beyond the next claimable day
//                             const isLocked = item.dayNum > totalCheckIns + 1;

//                             return (
//                                 <RewardItem
//                                     key={item.dayNum}
//                                     {...item}
//                                     isClaimed={isClaimed}
//                                     isUnlocked={isUnlocked}
//                                     isLocked={isLocked}
//                                     hasCompletedRequiredOrders={hasCompletedRequiredOrders}
//                                     onClaim={() => handleClaim(item.dayNum, item.numericAmount)}
//                                     isClaiming={isClaiming}
//                                 />
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// interface RewardItemProps {
//     day: string;
//     amount: string;
//     numericAmount: number;
//     dayNum: number;
//     isClaimed?: boolean;
//     isUnlocked?: boolean;
//     isLocked?: boolean;
//     hasCompletedRequiredOrders?: boolean;
//     isClaiming?: boolean;
//     onClaim: () => void;
// }

// function RewardItem({
//     day,
//     amount,
//     isClaimed = false,
//     isUnlocked = false,
//     isLocked = false,
//     hasCompletedRequiredOrders = false,
//     isClaiming = false,
//     onClaim,
// }: RewardItemProps) {

//     const handleClick = () => {
//         // Can't click if already claimed or currently claiming
//         if (isClaimed || isClaiming) return;

//         // If not unlocked, show appropriate message
//         if (!isUnlocked) {
//             if (!hasCompletedRequiredOrders) {
//                 toast.info("Complete 41 orders to unlock check-in rewards");
//             } else if (isLocked) {
//                 toast.info("Complete previous days first");
//             }
//             return;
//         }

//         // Claim the reward
//         onClaim();
//     };

//     return (
//         <div className="relative">
//             <button
//                 type="button"
//                 onClick={handleClick}
//                 disabled={isClaimed || isClaiming || !isUnlocked}
//                 className={`
//                     relative flex flex-col items-center gap-1 p-3 rounded-xl transition-all
//                     ${isClaimed
//                         ? "bg-green-50 border border-green-200 cursor-not-allowed"
//                         : isUnlocked
//                             ? "bg-blue-50 hover:bg-blue-100 border border-blue-200 active:scale-95 cursor-pointer"
//                             : "bg-gray-100 border border-gray-200 cursor-not-allowed"}
//                 `}
//             >
//                 {/* LOCK OVERLAY - show for locked days or if orders not completed */}
//                 {(isLocked || !hasCompletedRequiredOrders) && !isClaimed && (
//                     <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/30">
//                         <BsFileLock className="text-white text-2xl" />
//                     </div>
//                 )}

//                 <div
//                     className={`
//                         flex h-14 w-14 items-center justify-center rounded-full
//                         ${isClaimed ? "bg-green-100" : isUnlocked ? "bg-blue-100" : "bg-gray-200"}
//                     `}
//                 >
//                     {isClaimed ? (
//                         <span className="text-green-600 text-xl font-bold">✓</span>
//                     ) : (
//                         <img src={moneyBag} alt="money bag" className="h-7 w-7" />
//                     )}
//                 </div>

//                 <span className="text-xs text-gray-600 font-medium">{day}</span>
//                 <span
//                     className={`text-xs font-semibold ${isClaimed
//                         ? "text-green-600"
//                         : isUnlocked
//                             ? "text-blue-600"
//                             : "text-gray-400"
//                         }`}
//                 >
//                     {isClaimed ? "Claimed" : amount}
//                 </span>
//             </button>
//         </div>
//     );
// }