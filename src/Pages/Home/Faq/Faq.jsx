import  { useState } from 'react';

const Faq = () => {
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (index) => {
        if (openAccordion === index) {
            setOpenAccordion(null);
        } else {
            setOpenAccordion(index);
        }
    };

    const faqData = [
        {
            question: 'How do I donate blood?',
            answer: 'To donate blood, simply visit our donation center during operating hours and follow the instructions provided by our staff. Remember to bring a valid ID and ensure you meet the eligibility criteria for blood donation.'
        },
        {
            question: 'Who can donate blood?',
            answer: 'Most people who are in good health and meet the eligibility criteria can donate blood. However, there may be certain restrictions based on factors such as medical history, recent travel, and medication usage. Our staff will assess your eligibility before you donate.'
        },
        {
            question: 'Is it safe to donate blood?',
            answer: 'Yes, donating blood is safe for most people. Our donation process follows strict safety protocols to ensure the well-being of both donors and recipients. Our staff are trained professionals who prioritize your safety throughout the donation process.'
        },
        {
            question: 'How often can I donate blood?',
            answer: 'In most cases, you can donate blood every 56 days for whole blood donations and every 112 days for double red cell donations. However, it\'s important to follow the guidelines provided by our staff and avoid donating too frequently to prevent health risks.'
        },
        {
            question: 'Can I donate blood if I have medical conditions?',
            answer: 'Some medical conditions may disqualify you from donating blood, while others may require further assessment by our staff. It\'s important to disclose any relevant medical history and follow the guidance provided by our team.'
        }
    ];

    return (
        <section className="">
            <h1 className='text-5xl font-lato text-center py-24'>Frequently Asked Questions?</h1>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
                    <div className="w-full lg:w-1/2">
                        <img
                            src="https://i.ibb.co/r4FsyN9/blood-donation.jpg"
                            alt="FAQ tailwind section"
                            className="w-full"
                        />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="lg:max-w-xl">
                            <div className="mb-6 lg:mb-16">
                                <h6 className="text-lg text-center font-medium text-indigo-600 mb-2 lg:text-left">FAQs</h6>
                                <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">Looking for answers?</h2>
                            </div>
                            <div className="accordion-group" data-accordion="default-accordion">
                                {faqData.map((item, index) => (
                                    <div key={index} className={`accordion pb-8 border-b border-solid border-gray-200 ${openAccordion === index ? 'active' : ''}`}>
                                        <button
                                            className={`accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600 accordion-active:text-indigo-600 accordion-active:font-medium always-open ${openAccordion === index ? 'accordion-active' : ''}`}
                                            onClick={() => toggleAccordion(index)}
                                        >
                                            <h5>{item.question}</h5>
                                            <svg className={`text-gray-900 transition duration-500 group-hover:text-indigo-600 accordion-active:text-indigo-600 accordion-active:rotate-180 ${openAccordion === index ? 'accordion-active' : ''}`} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        </button>
                                        <div className={`accordion-content w-full px-0 overflow-hidden pr-4 ${openAccordion === index ? 'active' : ''}`}>
                                            <p className="text-base font-normal text-gray-600">{openAccordion === index ? item.answer : ''}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
