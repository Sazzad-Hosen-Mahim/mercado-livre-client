import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ChevronRight } from 'lucide-react';
import aboutImage from "@/assets/about/about.jpg";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className="hover:text-gray-900 cursor-pointer">Home</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900">About Us</span>
        </div>
      </div>

      {/* Hero Section with Background Image */}
      <div className="relative h-80 bg-gray-200 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${aboutImage})`,
          }}
        >
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white tracking-wide">About Us</h1>
        </div>
      </div>

      {/* Accordion Section */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="consultant-mode" className="border-b last:border-b-0 border-gray-400">
            <AccordionTrigger className="py-5 text-xl font-semibold hover:no-underline">
              1. About Consultant Mode
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-base text-gray-700 leading-relaxed">
              Platform users can invite others to join as consultants using an invitation code. Once they join, they become part of your downline.
              <br /><br />
              As an upline, you will receive a 5% commission from the earnings of your Senior Consultants in your downline.
              <br /><br />
              The commissions earned by the upline are automatically credited to their platform account and can be tracked in the Team Report.
              <br /><br />
              All consultants and downlines enjoy the same commission structure and rewards. Building a team does not affect your personal commissions or individual earnings.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cash-in" className="border-b last:border-b-0 border-gray-400">
            <AccordionTrigger className="py-5 text-xl font-semibold hover:no-underline">
              2. About Cash In
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-base text-gray-700 leading-relaxed">
              Cash-in can be completed through the “Contact Us” page. Simply slide the “Start” button to be redirected to the online Cash-In Client Service, where you will receive assistance with the remittance process.
              <br /><br />
              <strong>Cash-In Steps:</strong>
              <br />
              • Transfer the specified amount to the account number provided by the platform’s Client Service.
              <br />
              • Submit a screenshot of the successful transaction for verification.
              <br />
              • Ensure that the recipient’s name and the transfer amount match the details provided by Client Support.
              <br /><br />
              <strong>Important Notes:</strong>
              <br />
              • If you encounter any issues during the cash-in process, please contact the on-duty online Client Service for assistance.
              <br />
              • The platform may update its cash-in account details from time to time. Always verify the latest account information before making a transfer.
              <br />
              • Due to high transaction volumes, carefully double-check the account details to avoid errors.
              <br />
              • For any questions or assistance, please contact the platform’s online Client Service.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="frozen" className="border-b last:border-b-0 border-gray-400">
            <AccordionTrigger className="py-5 text-xl font-semibold hover:no-underline">
              3. About Frozen
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-base text-gray-700 leading-relaxed">
              Promotion are not submitted after receiving a order will be in "Processing". All you need to do is sliding the "start" button to complete the outstanding Promotion. The Promotion will be temporarily frozen because you have been assigned a Exclusive promotion by the system. After you complete the Exclusive promotion, that task will be release.
              <br /><br />
              <strong>Note:</strong> If you are unable to complete the Exclusive promotion within 72 hours, your account credit score will be lowered and you will have to cash in 50% of the insufficient amount in order to lift the freeze status.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="orders" className="border-b last:border-b-0 border-gray-400">
            <AccordionTrigger className="py-5 text-xl font-semibold hover:no-underline">
              4. About Orders
            </AccordionTrigger>
            <AccordionContent className="pb-6 text-base text-gray-700 leading-relaxed space-y-6">
              <div>
                <strong>1. Falcon Order</strong>
                <br />
                A Smart Falcon Order is a reward that allows all Consultant to earn more profit and is developed by traders, so members and Consultant can earn up to 3 times the Incentive. This is very rare and Consultant only have Zero (0-2) to two (maximum) chances in each round to get this reward.
              </div>

              <div>
                <strong>2. Premium Order</strong>
                <br />
                A Premium Order offers 6x–7x profit opportunities. These orders usually involve higher-value products and provide a greater chance of earning significant profits.
                <br /><br />
                If you receive a Premium Order while snatching on a user account, it is very important to complete and submit it properly to finish the snatch successfully.
                <br /><br />
                This is a special type of order that does not appear all the time. Its value and benefits can only be fully understood after submitting and completing the snatch. The opportunity to receive this Premium Order usually comes at the final stage of the snatching process.
              </div>

              <div>
                <strong>3. Luxury Order</strong>
                <p><strong>Why have Luxury promotion? <br /></strong>
                  Suppliers want to increase the exposure of their attraction Promotion package and also want to attract more agents to help increase the visibility of their attraction Promotion package, which can help them increase sales and Promotion rate, so they create Exclusive promotion.</p>
                <br />
                A Luxury Order appears when the snatching amount becomes significantly higher. After upgrading your level to VIP Level 5, this type of order may be displayed in your account.
                <br /><br />
                To complete a Luxury Order, you must submit it properly. It is available only at the highest level and is considered the final stage within the system.
                <br /><br />
                Luxury Orders are very rare, with only a 0.1% chance of appearing after upgrading to VIP Level 5.
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}