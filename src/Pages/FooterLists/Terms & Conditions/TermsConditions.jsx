import React from "react";

const TermsConditions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Terms & Conditions</h1>
      <h3 className="text-gray-500">
        Read about the terms and conditions for SHOP.CO
      </h3>
      <hr />

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to our website's Terms and Conditions. These terms are
              important and affect your legal rights, so please read them
              carefully. By using our website, you agree to these terms.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              2. Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using this website, you agree to be bound by the
              following terms and conditions. If you do not agree to these
              terms, please do not use this website.
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              3. Marketplace Offerings
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We make every effort to display as accurately as possible the
              colors, features, specifications, and details of the Marketplace
              Offerings available on the Site. However, we do not guarantee that
              the colors, features, specifications, and details of the
              Marketplace Offerings will be accurate, complete, reliable,
              current, or free of other errors, and your electronic display may
              not accurately reflect the actual colors and details of the
              products.
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              4. Contribution License
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You and the Site agree that we may access, store, process, and use
              any information and personal data that you provide following the
              terms of the Privacy Policy and your choices (including settings).
              By submitting suggestions or other feedback regarding the Site,
              you agree that we can use and share such feedback for any purpose
              without compensation to you.
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-2">
              5. Limitations Of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              In no event will we or our directors, employees, or agents be
              liable to you or any third party for any direct, indirect,
              consequential, exemplary, incidental, special, or punitive
              damages, including lost profit, lost revenue, loss of data, or
              other damages arising from your use of the site or the marketplace
              offerings, even if we have been advised of the possibility of such
              damages. Notwithstanding anything to the contrary contained
              herein, our liability to you for any cause whatsoever and
              regardless of the form of the action, will at all times be limited
              to the lesser of the amount paid, if any, by you to us. Certain us
              state laws and international laws do not allow limitations on
              implied warranties or the exclusion or limitation of certain
              damages. If these laws apply to you, some or all of the above
              disclaimers or limitations may not apply to you, and you may have
              additional rights.
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              In order to resolve a complaint regarding the Site or the
              Marketplace Offerings or to receive further information regarding
              use of the Site or the Marketplace Offerings, please contact us at{" "}
              <a
                href="mailto:shopcompass.sc@gmail.com"
                className="text-blue-500 hover:underline"
              >
                shopcompass.sc@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
