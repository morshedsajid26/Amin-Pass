import Container from "@/src/components/Container";
import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

const Privacy = () => {
  const sections = [
    {
      title: "1. About Aminpass",
      content: [
        "Aminpass is a digital loyalty card platform for businesses and customers. Multiple shops and brands can register on the platform, choose a subscription plan, and run their own loyalty offers, rewards, campaigns, and customer engagement programs through our website and mobile application.",
        "This Privacy Policy explains how we collect, use, store, and protect information when merchants, staff members, and customers use Aminpass. It is intended to support both our web experience and our mobile apps that may be published on Google Play Store and Apple App Store.",
      ],
    },
    {
      title: "2. Information We Collect",
      content: [
        "We collect only the information reasonably necessary to operate the Aminpass platform, support authentication, manage subscriptions, and deliver loyalty services.",
        "Depending on how the platform is used, this may include business registration details, contact information, account login details, subscription-related information, loyalty program setup data, offer and reward configuration, and customer activity related to points, visits, redemptions, or transactions within a merchant's program.",
        "Where enabled by the user and supported by the device, we may collect location information, including background location data, to power location-based features such as sending push notifications when a user comes within approximately 100 meters of a participating shop or merchant location.",
      ],
    },
    {
      title: "3. Authentication and Account Information",
      content: [
        "To allow secure sign-in and access control, Aminpass may store basic authentication-related information such as name, email address, phone number, account role, encrypted credentials or tokens, and related login/session data.",
        "We do not request unnecessary personal information during authentication, and we aim to keep account data limited to what is needed for platform access, security, and support.",
      ],
    },
    {
      title: "4. How We Use Information",
      content: [
        "We use collected information to create and manage merchant accounts, activate subscription plans, provide loyalty card services, process rewards and redemptions, support customer engagement programs, improve the performance of the platform, communicate service-related updates, and maintain security, fraud prevention, and operational reliability.",
        "Merchant information is also used to help shops manage their own loyalty campaigns, customer participation, and subscription status within Aminpass.",
      ],
    },
    {
      title: "5. Location Information",
      content: [
        "Aminpass may collect and process location information, including background location data, when the user grants permission on their device.",
        "This location access is used to support location-based engagement features, including sending push notifications when a user enters or comes within approximately 100 meters of a participating shop or merchant area.",
        "We use location data only for Aminpass service features and not for unrelated tracking purposes. Users can manage or disable location permissions at any time from their device settings, although some location-based features may then stop working properly.",
      ],
    },
    {
      title: "6. Data Sharing and Disclosure",
      content: [
        "Aminpass does not sell, rent, or share user personal data outside the Aminpass system for third-party marketing or unrelated commercial purposes.",
        "Data inside the platform is used only to operate Aminpass services for the relevant merchant, customer, staff member, or administrator based on their role and authorized use of the system.",
        "We may disclose information only if required by law, regulation, legal process, or to protect the rights, safety, and integrity of Aminpass, its users, merchants, or the public.",
      ],
    },
    {
      title: "7. Subscription and Merchant Program Data",
      content: [
        "Businesses using Aminpass may subscribe to one of our available plans. Information related to subscription status, billing context, loyalty offers, rewards, branches, staff access, and merchant program configuration may be stored and processed to provide the service.",
        "Each merchant remains responsible for the accuracy of the business information and program content they publish through the platform.",
      ],
    },
    {
      title: "8. Data Retention and Security",
      content: [
        "We retain information for as long as it is reasonably necessary to provide the service, comply with legal obligations, resolve disputes, enforce agreements, and maintain business records.",
        "We apply reasonable administrative, technical, and organizational safeguards to protect data against unauthorized access, loss, misuse, or disclosure. However, no method of transmission or storage can be guaranteed to be completely secure.",
      ],
    },
    {
      title: "9. Account Deletion Requests",
      content: [
        "If a user or merchant wants to request account deletion, they must contact Aminpass administration or support directly.",
        "After receiving a valid request, we will review it and take appropriate action in accordance with legal, operational, and record-keeping requirements. Some information may be retained where necessary for compliance, fraud prevention, dispute resolution, or legitimate business purposes.",
      ],
    },
    {
      title: "10. Children's Privacy",
      content: [
        "Aminpass is not intended for children who are below the minimum age required under applicable law to use the service independently. We do not knowingly collect personal information from children in violation of applicable legal requirements.",
      ],
    },
    {
      title: "11. Changes to This Privacy Policy",
      content: [
        "We may update this Privacy Policy from time to time to reflect changes in the platform, legal obligations, security practices, or business operations. When we make material updates, we may revise this page and update the effective policy content on our website or app.",
      ],
    },
    {
      title: "12. Contact Us",
      content: [
        "If you have questions about this Privacy Policy, your account, your data, or an account deletion request, please contact Aminpass support or administration using the contact details below.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Container className={``}>
        <div className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <p className="font-inter">Hello!! Welcome to Aminpass</p>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <p className="flex items-center gap-1 font-inter">
              <MdOutlineMarkEmailUnread />
              aminpass@gmail.com
            </p>
            <p className="flex items-center gap-1 font-inter">
              <FiPhoneCall />
              +757 699-4478
            </p>
          </div>
        </div>
        <div className="border-t border-[#E6E6E6]/60 py-10">
          <div>
            <h1 className="font-inter text-4xl font-bold text-[#121212] md:text-[56px]">
              Privacy Policy
            </h1>
            <p className="mt-4 font-inter text-base text-[#707071] md:text-lg">
              Effective for Aminpass website and mobile application services.
            </p>
            <p className="mt-8 max-w-5xl font-inter text-lg leading-8 text-[#707071] md:text-[24px] md:leading-[42px]">
              Your privacy matters to us. This Privacy Policy describes how
              Aminpass collects, uses, stores, and protects information across
              our loyalty card platform for merchants, staff, and customers.
              It is written to support our website and our mobile apps intended
              for publication on Google Play Store and Apple App Store.
            </p>
          </div>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-inter text-2xl font-bold text-[#121212] md:text-[34px]">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4">
                  {section.content.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-inter text-base leading-8 text-[#707071] md:text-[22px] md:leading-[38px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-[20px] bg-[#F7F9FB] px-6 py-8 md:px-10">
            <h2 className="font-inter text-2xl font-bold text-[#121212] md:text-[32px]">
              Support Contact
            </h2>
            <div className="mt-5 space-y-3 font-inter text-base text-[#707071] md:text-[22px]">
              <p className="flex items-center gap-2">
                <MdOutlineMarkEmailUnread className="shrink-0" />
                aminpass@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <FiPhoneCall className="shrink-0" />
                +757 699-4478
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Privacy;
