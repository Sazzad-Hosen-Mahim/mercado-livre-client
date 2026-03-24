import { Loader2 } from "lucide-react";
import { useGetUserCompletedProductsQuery, useGetUserUncompletedProductsQuery } from "@/store/api/user/userApi";
import { useState } from "react";

interface Product {
    _id: string;
    productId: number;
    status: string;
    name: string;
    price: number;
    commission: number;
    salePrice: number;
    introduction: string;
    poster: string;
    isAdminAssigned: boolean;
    createdAt: string;
    updatedAt: string;
}

const OrderRecord = () => {
    const userId = localStorage.getItem("userId");
    const [activeTab, setActiveTab] = useState<"completed" | "uncompleted">("completed");

    const completedQuery = useGetUserCompletedProductsQuery(
        Number(userId),
        {
            skip: !userId || activeTab !== "completed",
        }
    );

    const uncompletedQuery = useGetUserUncompletedProductsQuery(
        Number(userId),
        {
            skip: !userId || activeTab !== "uncompleted",
        }
    );

    const { data, isLoading, error } = activeTab === "completed" ? completedQuery : uncompletedQuery;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 19).replace("T", " ");
    };

    const formatPrice = (price: number) => {
        return price.toFixed(2);
    };

    if (!userId) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Please login to view your orders</p>
                </div>
            </div>
        );
    }

    const products = data?.data || [];

    return (
        <div className="min-h-screen bg-gray-50 pb-6">
            <div className="max-w-md mx-auto">
                {/* Tabs */}
                <div className="flex bg-white border-b sticky top-0 z-20">
                    <button
                        onClick={() => setActiveTab("completed")}
                        className={`flex-1 py-4 text-center font-medium transition-all relative ${activeTab === "completed"
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Completed
                        {activeTab === "completed" && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("uncompleted")}
                        className={`flex-1 py-4 text-center font-medium transition-all relative ${activeTab === "uncompleted"
                            ? "text-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Uncompleted
                        {activeTab === "uncompleted" && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
                        )}
                    </button>
                </div>

                <div className="px-4 pt-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center pt-20">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center pt-20">
                            <p className="text-red-500">Failed to load orders</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center pt-20 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl">📦</span>
                            </div>
                            <p className="text-gray-500 font-medium">No {activeTab} orders found</p>
                            <p className="text-gray-400 text-sm max-w-[200px]">When you have {activeTab} orders, they will appear here.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {products.map((product: Product, index: number) => (
                                <div
                                    key={`${product._id}-${index}`}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden relative border border-gray-100"
                                >
                                    {/* Corner Badge */}
                                    {activeTab === "completed" && (
                                        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 transform rotate-45 translate-x-6 -translate-y-6 shadow-sm"></div>
                                            <div className="absolute top-1 right-1 text-white text-xs font-bold z-10">
                                                ✓
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "uncompleted" && (
                                        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 transform rotate-45 translate-x-6 -translate-y-6 shadow-sm"></div>
                                            <div className="absolute top-1 right-1 text-white text-[10px] font-bold z-10">
                                                !
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-4">
                                        {/* Header */}
                                        <div className="mb-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className={`w-2 h-2 rounded-full ${activeTab === 'completed' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                                                    {activeTab === 'completed' ? 'Completed' : 'Pending'} Mercado Livre
                                                </p>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 leading-tight">
                                                {product.name}
                                            </h3>
                                        </div>

                                        {/* Product Image */}
                                        <div className="mb-4 relative rounded-lg overflow-hidden group">
                                            <img
                                                src={product.poster}
                                                alt={product.name}
                                                className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                            <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] px-2 py-0.5 rounded font-bold">
                                                REF: {product.productId}
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="space-y-2.5">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-gray-400">Order time</span>
                                                <span className="text-gray-600 font-medium">
                                                    {formatDate(product.createdAt)}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-start text-xs border-b border-gray-50 pb-2">
                                                <span className="text-gray-400">Introduction</span>
                                                <span className="text-gray-600 text-right max-w-[180px] line-clamp-1 italic">
                                                    {product.introduction}
                                                </span>
                                            </div>

                                            <div className="bg-gray-50/50 p-3 rounded-lg border border-gray-100/50">
                                                <div className="flex justify-between items-center text-sm mb-1.5">
                                                    <span className="text-gray-500">Unit Price</span>
                                                    <span className="text-gray-700 font-semibold">
                                                        ৳{formatPrice(product.price)}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between items-center text-sm text-green-600 mb-1.5">
                                                    <span className="flex items-center gap-1">Commission <span className="text-[10px] bg-green-100 px-1 rounded">Earn</span></span>
                                                    <span className="font-bold">+৳{formatPrice(product.commission)}</span>
                                                </div>

                                                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                                    <span className="text-gray-900 font-bold">Total Return</span>
                                                    <span className="text-blue-600 text-lg font-black">
                                                        ৳{formatPrice(product.salePrice)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            disabled={activeTab === 'completed'}
                                            className={`w-full mt-4 py-3 rounded-xl font-bold transition-all shadow-sm ${activeTab === 'completed'
                                                ? "bg-black text-gray-400 cursor-not-allowed"
                                                : "bg-red-500 text-white  active:scale-[0.98]"
                                                }`}
                                        >
                                            {activeTab === 'completed' ? 'Completed' : 'Uncompleted Order'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderRecord;