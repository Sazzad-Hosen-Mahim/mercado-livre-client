import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import prod1 from "@/assets/product/macbook-new.jpg";
import prod2 from "@/assets/product/channel.jpg";
import prod3 from "@/assets/product/lipstick.jpg";
import prod4 from "@/assets/product/microwave-oven.jpg";
import prod5 from "@/assets/product/face-wash.jpg";
import AccountDetailsModal from "@/components/modal/AccountDetailsModal";
import PackageSelectionModal from "@/components/modal/PackageSelectionModal";
import MysteryBoxModal from "@/components/modal/MysteryBoxModal";
import MysteryBoxRewardModal from "@/components/modal/MysteryBoxRewardModal";
import {
  useGetSingleUserQuery,
  useUpdateSelectedPackageMutation,
  useRemoveMysteryRewardMutation,
  // useGetPurchaseOrderQuery,
  useMarkMysteryBoxAsSeenMutation
} from "@/store/api/user/userApi";
import { toast } from "sonner";
import MiningOrderModal from "@/components/modal/MiningOrderModal";
import ErrorModal from "@/components/modal/ErrorModal";
import ErrorModalBlack from "@/components/modal/ErrorModalBlack";

interface TaskItem {
  id: number;
  image: string;
  title: string;
  reviews: string;
}

const Task: React.FC = () => {
  const navigate = useNavigate();
  const tasks: TaskItem[] = [
    {
      id: 1,
      image: prod1,
      title: "Macbook Air M4",
      reviews: "6,507 Reviews",
    },
    {
      id: 2,
      image: prod2,
      title: "N°5 Eau de Parfum",
      reviews: "16,772 Reviews",
    },
    {
      id: 3,
      image: prod3,
      title: "New York Superstay Vinyl Ink Lipstick",
      reviews: "14,803 Reviews",
    },
    {
      id: 4,
      image: prod4,
      title: "GE Countertop Microwave Oven,1, 200-watt Capacity, 2.0 Cubic Ft., 8 Auto Setting",
      reviews: "5,458 Reviews",
    },
    {
      id: 5,
      image: prod5,
      title: "Neutrogena Hydro Boost Face Wash, Fragrance Free, Hydrating Facial Cleanser",
      reviews: "10,237 Reviews",
    },
  ];

  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [openPackageModal, setOpenPackageModal] = useState(false);
  const [openMysteryBoxModal, setOpenMysteryBoxModal] = useState(false);
  const [openMysteryRewardModal, setOpenMysteryRewardModal] = useState(false);
  const [activeMysteryReward, setActiveMysteryReward] = useState<number | null>(null);
  const [mysteryBoxData, setMysteryBoxData] = useState<any>(null);
  const [openMiningModal, setOpenMiningModal] = useState(false);
  // const [openTrialModal, setOpenTrialModal] = useState(false);

  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage,] = useState("");
  const [errorMessageBlack, setErrorMessageBlack] = useState("");
  const [openErrorModalBlack, setOpenErrorModalBlack] = useState(false);
  const [, setShouldCheckOrder] = useState(false);

  // Fetch user data
  const id = localStorage.getItem("userId");
  const userId = id ? parseInt(id) : 0;

  const { data: userData, isLoading,
    isFetching,
    refetch } = useGetSingleUserQuery(userId, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });


  const [updatePackage, { isLoading: isUpdating }] = useUpdateSelectedPackageMutation();
  const [removeMysteryReward] = useRemoveMysteryRewardMutation();
  const [markMysteryBoxAsSeen] = useMarkMysteryBoxAsSeenMutation();

  // Add the purchase order query to check for errors
  // const { data: purchaseOrderData, error: purchaseOrderError, isLoading: isPurchaseOrderLoading } = useGetPurchaseOrderQuery(userId, {
  //   // refetchOnMountOrArgChange: true,
  //   // skip: !shouldCheckOrder,
  // });

  const user = userData?.data;

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  // Check for mystery reward on component mount
  useEffect(() => {
    if (user && user.mysteryReward && user.mysteryReward > 0) {
      setActiveMysteryReward(user.mysteryReward);
      setOpenMysteryRewardModal(true);
    }
  }, [user]);

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

  console.log(user, "aaaaayaaaat")

  const handleStartClick = () => {
    // Check if user has admin assigned products with mystery box
    // refetch();
    if (user?.adminAssaignProductsOrRewards && user.adminAssaignProductsOrRewards.length > 0) {
      const productWithMysteryBox = user.adminAssaignProductsOrRewards.find(
        (product: any) =>
          product.mysterybox &&
          product.mysterybox.method &&
          product.mysterybox.amount &&
          product.mysterybox.seenTheReward === false // Only show if not seen
      );
      const mysteryBoxOrderNumber = productWithMysteryBox?.orderNumber;

      if (mysteryBoxOrderNumber === user?.completedOrdersCount + 1) {
        setMysteryBoxData({
          ...productWithMysteryBox.mysterybox,
          productId: productWithMysteryBox.productId // Store productId for marking as seen
        });
        setOpenMysteryBoxModal(true);
        return;
      }
    }

    refetch();

    if ((user?.orderRound?.round === "trial") && (user?.completedOrdersCount === 25) && (user?.trialRoundBalance === 0)) {
      setErrorMessageBlack("Your trial round has been completed. Now, to start the next round, please contact your senior consultant.");
      setOpenErrorModalBlack(true);
      return;
    }
    if ((user?.orderRound?.round === "round_one") && (user?.completedOrdersCount === 25)) {
      setErrorMessageBlack("Your round one has been completed. Now, to start the next round, please contact your support line.");
      setOpenErrorModalBlack(true);
      return;
    }



    // Check if user has selected package (0 means not selected)
    if (!user?.userSelectedPackage || user.userSelectedPackage === 0) {
      // Only open package modal, don't open mining modal
      setOpenPackageModal(true);
    } else {
      // User has selected package, open mining modal and trigger order check
      setOpenMiningModal(true);
      setShouldCheckOrder(true);
    }
  };

  const handlePackageSelection = async (amount: number) => {
    try {
      await updatePackage({ userId, amount }).unwrap();
      setOpenPackageModal(false);
      toast.success("Package selected successfully");
      console.log("Package selected successfully:", amount);

      // After package selection, show mining modal and proceed with normal flow
      setOpenMiningModal(true);
      setShouldCheckOrder(true);
    } catch (error) {
      console.error("Failed to update package:", error);
      toast.error((error as any)?.data?.message);
    }
  };

  const handleMysteryRewardContinue = async () => {
    try {
      await removeMysteryReward(userId).unwrap();
      setOpenMysteryRewardModal(false);
      toast.success("Mystery reward claimed successfully!");
      console.log("Mystery reward removed successfully");
    } catch (error) {
      console.error("Failed to remove mystery reward:", error);
      toast.error((error as any)?.data?.message);
    }


  };

  if (isLoading && !userData) {
    return (
      <div className="max-w-[500px] mx-auto bg-white h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }



  return (
    <div className="max-w-[500px] mx-auto min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Optional: Loading Overlay for Background Refetches */}
      {isFetching && userData && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-black text-white text-xs px-4 py-1 rounded-full shadow">
          Syncing...
        </div>
      )}
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <p className="text-xs text-gray-500 mb-1">Dashboard</p>
        <h1 className="text-2xl font-semibold text-gray-900">Shopping Tasks</h1>
      </div>

      {/* Tab Headers */}
      {/* <div className="grid grid-cols-2 border-b border-gray-300">
        <div className="text-center py-3 font-semibold text-gray-900 border-b-2 border-gray-900">
          Ng.Collection
        </div>
        <div className="text-center py-3 font-semibold text-gray-600">
          Description
        </div>
      </div> */}

      {/* Product List */}
      <div className="px-4 space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="text-lg font-semibold text-gray-900 w-6">
              {task.id}
            </div>
            <img src={task.image} className="w-14 h-14 rounded-xl object-cover" />

            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{task.title}</h3>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Star className="w-3 h-3 mr-1" />
                {task.reviews}
              </div>
            </div>

            <ChevronRight className="text-gray-400" />
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="px-4 mt-6 pb-24">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button onClick={() => setOpenAccountModal(true)} className="bg-black text-white py-3 cursor-pointer rounded-xl text-sm hover:bg-gray-900">
            Account
          </button>

          <Link to="/order-record" className="bg-gray-200 py-3 cursor-pointer rounded-xl text-sm text-center hover:bg-gray-300">
            Records
          </Link>
        </div>

        <button onClick={handleStartClick} className="w-full cursor-pointer bg-black text-white py-4 rounded-2xl text-lg font-semibold shadow-lg hover:bg-gray-900">
          Start {user?.completedOrdersCount || 0}/25
        </button>
      </div>

      {/* Modals */}
      <AccountDetailsModal
        open={openAccountModal}
        onClose={() => {
          refetch();
          setOpenAccountModal(false);
        }}
        data={accountDetailsData}
      />

      <PackageSelectionModal
        open={openPackageModal}
        onClose={() => setOpenPackageModal(false)}
        availableSlots={user?.userOrderAmountSlot || []}
        onSelectPackage={handlePackageSelection}
        isLoading={isUpdating}
      />

      {/* Mystery Box Modal (for admin assigned products) */}
      {mysteryBoxData && (
        <MysteryBoxModal
          open={openMysteryBoxModal}
          onClose={async () => {
            // Mark mystery box as seen when user claims it
            if (mysteryBoxData.productId) {
              try {
                await markMysteryBoxAsSeen({
                  userId,
                  productId: mysteryBoxData.productId
                }).unwrap();
                console.log("Mystery box marked as seen");
              } catch (error) {
                console.error("Failed to mark mystery box as seen:", error);
              }
            }
            setOpenMysteryBoxModal(false);
            setMysteryBoxData(null);
            navigate("/product");
          }}
          mysteryBoxData={mysteryBoxData}
        />
      )}

      {/* Mystery Reward Modal (for global mystery reward) */}
      {activeMysteryReward && (
        <MysteryBoxRewardModal
          open={openMysteryRewardModal}
          onClose={async () => {
            try {
              await removeMysteryReward(userId).unwrap();
              console.log("Mystery reward removed successfully");
            } catch (error) {
              console.error("Failed to remove mystery reward:", error);
            }
            setOpenMysteryRewardModal(false);
            setActiveMysteryReward(null);
          }}
          mysteryReward={activeMysteryReward}
          onContinue={handleMysteryRewardContinue}
        />
      )}
      {/* Mining Order Modal */}
      <MiningOrderModal open={openMiningModal} setOpen={setOpenMiningModal} />
      {/* Error Modal */}
      <ErrorModal
        isOpen={openErrorModal}
        message={errorMessage}
        onClose={() => setOpenErrorModal(false)}
      />
      <ErrorModalBlack
        isOpen={openErrorModalBlack}
        message={errorMessageBlack}
        onClose={() => setOpenErrorModalBlack(false)}
      />

      {/* Add padding at bottom to prevent content from being hidden behind fixed buttons */}
      {/* <div className="h-32"></div> */}
    </div>
  );
};

export default Task;  