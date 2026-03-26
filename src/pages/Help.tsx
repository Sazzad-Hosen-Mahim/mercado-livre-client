import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { ChevronRight } from "lucide-react";
import helpImage from "@/assets/help/help.jpg"; // or any banner image you prefer

export default function Help() {
    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex items-center text-sm text-gray-600">
                    <span className="hover:text-gray-900 cursor-pointer">Home</span>
                    <ChevronRight className="w-4 h-4 mx-2" />
                    <span className="text-gray-900">Help</span>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-100 bg-gray-200 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${helpImage})`,
                    }}
                >
                    <div className="absolute inset-0 bg-black/35" />
                </div>
                <div className="relative h-full flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-white tracking-wide">
                        Help & Support
                    </h1>
                </div>
            </div>

            {/* Accordion Section */}
            <div className="max-w-5xl mx-auto px-6 py-16">
                <Accordion type="single" collapsible className="w-full">
                    {/* 1. Platform */}
                    <AccordionItem value="platform" className="border-b last:border-b-0 border-gray-300">
                        <AccordionTrigger className="py-5 text-xl font-semibold hover:no-underline">
                            1. Platform
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 text-base text-gray-700 leading-relaxed space-y-4">
                            <p>
                                1. Mercado Livre England, United Kingdom helps merchants conduct cross-border transactions, providing a system mechanism for greater mobility and faster transactions.
                            </p>
                            <p>
                                2. The platform provides customized review display options, allowing brands to display customer feedback in an eye-catching way on their website.
                            </p>
                            <p>
                                3. By displaying real user reviews, Mercado Livre England, United Kingdom helps brands build trust and improve potential customers' purchasing decisions.
                            </p>
                            <p>
                                4. The tool provides data analysis to help brands and retailers gain insights into customer feedback and identify product strengths and weaknesses.
                            </p>
                            <p>
                                5. Mercado Livre England, United Kingdom can be integrated with agencies and marketing tools in different countries to help brands manage customer transactions in cross-border channels.
                            </p>
                            <p>
                                6. <strong>Benefits:</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>
                                    Improve conversion rate: Showing positive customer reviews can often increase the trust of potential customers, thereby increasing conversion rates.
                                </li>
                                <li>
                                    Understand customer needs: By analysing reviews, brands can better understand consumer needs and preferences to improve products and services.
                                </li>
                                <li>
                                    Enhance awareness and exposure: Make more Autotrades car and parts designs known to more people and increase transaction volume on international platforms.
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 2. Cash Out */}
                    <AccordionItem value="cashout" className="border-b last:border-b-0 border-gray-300">
                        <AccordionTrigger className="py-5 text-xl font-semibold hover:no-underline">
                            2. Cash Out
                        </AccordionTrigger>
                        <AccordionContent className="pb-6 text-base text-gray-700 leading-relaxed space-y-4">
                            <p>
                                1. After completing every set of orders, you may submit <strong>Cash Out</strong> once only. Please bind your bank information on the platform before submitting a Cash Out request.
                            </p>
                            <p>
                                2. Click the <strong>"Cash Out"</strong> button after entering the amount you want to Cash Out, then enter your Cash Out password to proceed. The actual arrival time depends on your bank’s processing time.
                            </p>
                            <p>
                                3. Accounts are not allowed to keep remaining funds exceeding <strong>100,000 taka</strong> after applying for Cash Out.
                            </p>
                            <p>
                                4. <strong>Note:</strong> Cash Out time is from <strong>10:00 AM to 10:00 PM</strong>. Only one Cash Out request can be made per day.
                            </p>
                            <p>
                                5. The maximum Cash Out amount is <strong>10,000,000 taka</strong>.
                            </p>
                            <p>
                                6. If the first Cash Out exceeds <strong>500,000 taka</strong>, a <strong>50% security Cash In</strong> is required for safety verification. The Cash Out can be completed after <strong>1 hour</strong>.
                            </p>
                            <p>
                                7. The <strong>50% Cash In</strong> only needs to be paid once. For future Cash Outs exceeding 500,000 taka, no additional security Cash In is required.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}




