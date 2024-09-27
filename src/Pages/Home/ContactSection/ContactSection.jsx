/* eslint-disable react/prop-types */
import { Parallax } from 'react-parallax';

const ContactSection = () => {
  return (
    <>
      {/* component */}
      <section>
        <Parallax
          bgImage="https://bucket.material-tailwind.com/magic-ai/bbe71871de8b4d6f23bb0f17a6d5aa342f3dea72677ba7238b18defa3741244d.jpg"
          strength={500}
        >
          <div style={{ height: '500px' }}>
            <div className="absolute inset-0 h-full w-full bg-black/50"></div>
            <div className="relative pt-16 md:pt-28 text-center">
              <h2 className="block antialiased tracking-normal font-sans font-semibold leading-[1.3] text-white mb-4 text-2xl sm:text-3xl lg:text-4xl">
                Contact Us
              </h2>
              <p className="block antialiased font-sans text-lg sm:text-xl font-normal leading-relaxed text-white mb-6 sm:mb-9 opacity-70">
                We're here to help you save lives. Reach out to us for any queries.
              </p>
            </div>
          </div>
        </Parallax>

        <div className="-mt-10 md:-mt-16 mb-8 px-4 md:px-8">
          <div className="container mx-auto">
            <div className="py-8 md:py-12 flex flex-col md:flex-row md:justify-between items-center md:items-start rounded-xl border border-white bg-white shadow-md shadow-black/5 saturate-200">
              <div className="my-8 grid gap-4 sm:gap-6 px-4">
                {/* Contact Info */}
                {[
                  { icon: 'location', text: '456 Blood Donation Avenue, Los Angeles, CA' },
                  { icon: 'phone', text: '+1 987 654 3210' },
                  { icon: 'email', text: 'support@blooddonation.org' },
                  { icon: 'ticket', text: 'Open Support Ticket' },
                  { icon: 'career', text: 'Career Opportunities' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 sm:gap-4">
                    <ContactIcon icon={item.icon} />
                    <p className="block antialiased font-sans text-sm sm:text-base leading-relaxed text-inherit font-bold">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="my-8 px-4 w-full md:w-1/2">
                <p className="mb-4 sm:mb-8 block antialiased font-sans text-lg sm:text-xl font-bold leading-snug tracking-normal text-[#1A237E] text-left">
                  Have more questions?
                </p>
                <form>
                  <div className="grid gap-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-3 py-2 rounded-lg border border-blue-gray-100 bg-white text-blue-gray-700 outline-none focus:border focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-3 py-2 rounded-lg border border-blue-gray-100 bg-white text-blue-gray-700 outline-none focus:border focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Message"
                        rows="5"
                        className="w-full px-3 py-2 rounded-lg border border-blue-gray-100 bg-white text-blue-gray-700 outline-none focus:border focus:border-blue-500 resize-none"
                      ></textarea>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="flex select-none items-center justify-center gap-2 rounded-lg bg-[#1A237E] py-3 px-6 text-center align-middle font-sans text-xs sm:text-sm font-bold uppercase text-white shadow-md shadow-blue-gray-900/10 transition-all hover:shadow-lg hover:shadow-blue-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ContactIcon = ({ icon }) => {
  const icons = {
    location: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-5 sm:h-6 w-5 sm:w-6"
      >
        <path
          fillRule="evenodd"
          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
    phone: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-5 sm:h-6 w-5 sm:w-6"
      >
        <path
          fillRule="evenodd"
          d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
    email: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-5 sm:h-6 w-5 sm:w-6"
      >
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"></path>
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"></path>
      </svg>
    ),
    ticket: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-5 sm:h-6 w-5 sm:w-6"
      >
        <path
          fillRule="evenodd"
          d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65l-.003.001-.017.01a3.24 3.24 0 00-1.605 2.837c0 1.214.644 2.307 1.605 2.837l.017.01.003.001a.75.75 0 01.375.65v3.026a1.875 1.875 0 01-1.875 1.875H3.375A1.875 1.875 0 011.5 19.625v-3.026a.75.75 0 01.375-.65l.003-.001.017-.01a3.24 3.24 0 001.605-2.837 3.24 3.24 0 00-1.605-2.837l-.017-.01-.003-.001a.75.75 0 01-.375-.65V6.375zm4.5.375a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM6.75 18a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0V18zm11.625 0a.75.75 0 10-1.5 0v1.5a.75.75 0 001.5 0V18zm-1.875-11.25a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0v-1.5zm2.25 5.625a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0v-1.5z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
    career: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-5 sm:h-6 w-5 sm:w-6"
      >
        <path
          fillRule="evenodd"
          d="M7.5 4.875a.375.375 0 00-.375.375v1.5h9.75v-1.5a.375.375 0 00-.375-.375h-9zM6 5.25a1.5 1.5 0 011.5-1.5h9a1.5 1.5 0 011.5 1.5v1.5h2.25A1.5 1.5 0 0121 8.25v1.898l-8.678 3.899a1.875 1.875 0 01-1.644 0L2 10.148V8.25A1.5 1.5 0 013.75 6.75H6v-1.5zM3.858 11.815l6.565 2.947a3.375 3.375 0 002.871 0l6.565-2.947v5.435A1.5 1.5 0 0118.75 18H5.25a1.5 1.5 0 01-1.5-1.5v-5.435z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  };

  return icons[icon] || null;
};

export default ContactSection;
