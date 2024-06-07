import { motion } from 'framer-motion'; // Import motion for animation effects

// Testimonial component
// eslint-disable-next-line react/prop-types
const Testimonial = ({ name, position, company, content }) => {
    return (
        <motion.div
            className="bg-white p-6 shadow-md rounded-md"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} // Add hover animation effect
        >
            <p className="text-lg text-gray-800 mb-4">{content}</p>
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <img
                        className="w-12 h-12 rounded-full"
                        src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`} // Random user image for demonstration
                        alt={name}
                    />
                </div>
                <div className="ml-4">
                    <div className="text-lg font-semibold text-gray-800">{name}</div>
                    <div className="text-gray-600">{position}</div>
                    {company && <div className="text-gray-600">{company}</div>}
                </div>
            </div>
        </motion.div>
    );
};

// Testimonials data
const testimonialsData = [
    {
        name: 'John Doe',
        position: 'Blood Donor',
        company: 'LifeSource Blood Bank',
        content: 'Donating blood at LifeSource has been a rewarding experience. The staff is professional and friendly, making the process seamless. Knowing my donation can save lives is incredibly fulfilling.',
    },
    {
        name: 'Jane Smith',
        position: 'Recipient',
        company: 'LifeSource Blood Bank',
        content: 'Receiving blood from LifeSource saved my life. I am eternally grateful to the donors and the team at LifeSource for their dedication and care. Their efforts make a real difference.',
    },
    {
        name: 'Emily Johnson',
        position: 'Volunteer Coordinator',
        company: 'LifeSource Blood Bank',
        content: 'Coordinating volunteers at LifeSource has been an enriching journey. The commitment of our volunteers and the impact we make together is truly inspiring. Every donation counts, and it’s heartwarming to see the community come together.',
    },
    {
        name: 'Robert Brown',
        position: 'Volunteer',
        company: 'LifeSource Blood Bank',
        content: 'Volunteering at LifeSource has given me a new perspective on community service. It’s amazing to see the generosity of donors and the difference it makes in the lives of recipients. I’m proud to be part of this mission.',
    },
    {
        name: 'Laura Wilson',
        position: 'Blood Donor',
        company: 'LifeSource Blood Bank',
        content: 'LifeSource makes blood donation easy and comfortable. The staff ensures that every donor is well-informed and at ease. It’s a great feeling to contribute to saving lives through this noble cause.',
    },
    {
        name: 'Michael Green',
        position: 'Recipient',
        company: 'LifeSource Blood Bank',
        content: 'The blood I received from LifeSource was crucial during my surgery. I’m thankful for the donors and the efficient process at LifeSource. Their support was a lifeline for me and my family.',
    },
    // Add more testimonials as needed
];

// Testimonials component
const Testimonials = () => {
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Testimonials from Our Donors and Recipients</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonialsData.map((testimonial, index) => (
                        <Testimonial key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
