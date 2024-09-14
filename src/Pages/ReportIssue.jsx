// import React, { useState, useRef } from 'react';
// import { HiLightBulb, HiExclamation, HiMail, HiPaperAirplane } from 'react-icons/hi';
// import emailjs from 'emailjs-com';

// const RequestFeatureReportIssue = () => {
//   const [isFeature, setIsFeature] = useState(true);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const form = useRef();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsError(false);

//     emailjs.sendForm('service_ugqrpcu', 'template_iz5pcva', form.current, 'I0BXSqsH7YBt5ciXX')
//       .then(() => {
//         setIsSubmitted(true);
//         setTimeout(() => setIsSubmitted(false), 5000);
//         e.target.reset();
//       }, (error) => {
//         console.error('Email sending failed:', error);
//         setIsError(true);
//         setTimeout(() => setIsError(false), 5000);
//       });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[94vh] p-4 font-sans bg-primaryVariant">
//       <div className="w-full max-w-[768px] bg-primary rounded-3xl shadow-2xl overflow-hidden">
//         <div className="grid md:grid-cols-2">
//           {/* Info Section */}
//           <div className="px-6 py-8 bg-bgVariant text-bg md:rounded-l-3xl">
//             <h2 className="mb-6 font-serif text-2xl font-bold text-center text-white">
//               Help Us Improve
//             </h2>
//             <div className="space-y-6">
//               <InfoCard
//                 icon={<HiLightBulb className="text-3xl" />}
//                 title="Request a Feature"
//                 content="Have an idea to make our product better? We'd love to hear it!"
//               />
//               <InfoCard
//                 icon={<HiExclamation className="text-3xl" />}
//                 title="Report an Issue"
//                 content="Encountered a problem? Let us know so we can fix it quickly."
//               />
//               <InfoCard
//                 icon={<HiMail className="text-3xl" />}
//                 title="Contact Us"
//                 content="For any other inquiries, feel free to reach out."
//                 email="support@example.com"
//               />
//             </div>
//           </div>

//           {/* Form Section */}
//           <form ref={form} onSubmit={handleSubmit} className="px-6 py-8 bg-gradient-to-br from-primary to-primaryVariant md:rounded-r-3xl">
//             <h2 className="mb-6 font-serif text-2xl font-bold text-center text-bg">
//               {isFeature ? "Request a Feature" : "Report an Issue"}
//             </h2>

//             <div className="flex justify-center mb-4 space-x-4">
//               <ToggleButton
//                 active={isFeature}
//                 onClick={() => setIsFeature(true)}
//                 icon={<HiLightBulb className="mr-2" />}
//                 text="Feature"
//               />
//               <ToggleButton
//                 active={!isFeature}
//                 onClick={() => setIsFeature(false)}
//                 icon={<HiExclamation className="mr-2" />}
//                 text="Issue"
//               />
//             </div>

//             <Input name="name" placeholder="Your Name" />
//             <Input name="email" type="email" placeholder="Your Email" />
//             <Input name="title" placeholder={isFeature ? "Feature Title" : "Issue Title"} />
//             <textarea
//               name="description"
//               rows="4"
//               placeholder={isFeature ? "Describe your feature request" : "Describe the issue"}
//               required
//               className="w-full px-4 py-2 mb-4 text-sm bg-white border-2 border-transparent rounded-lg outline-none resize-none text-bgVariant focus:ring-2 focus:ring-bg focus:border-bg"
//             ></textarea>

//             {isSubmitted && (
//               <p className="p-2 mb-4 text-sm font-semibold text-center bg-white rounded-lg text-bg animate-fadeIn">
//                 Thank you for your submission!
//               </p>
//             )}

//             {isError && (
//               <p className="p-2 mb-4 text-sm font-semibold text-center text-white bg-red-500 rounded-lg animate-fadeIn">
//                 An error occurred. Please try again later.
//               </p>
//             )}

//             <button
//               type="submit"
//               className="flex items-center justify-center w-full px-6 py-2 font-semibold text-white transition-all duration-300 border-2 rounded-full bg-bg hover:bg-bgVariant border-bg"
//             >
//               <HiPaperAirplane className="mr-2" />
//               Submit {isFeature ? "Feature Request" : "Issue Report"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// const InfoCard = ({ icon, title, content, email }) => (
//   <div className="flex items-start p-4 space-x-3 transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-lg">
//     <div className="p-2 rounded-full bg-bg text-primary">{icon}</div>
//     <div>
//       <h4 className="font-semibold text-bgVariant">{title}</h4>
//       <p className="mt-1 text-sm text-bgVariant">{content}</p>
//       {email && (
//         <a href={`mailto:${email}`} className="text-sm transition-colors duration-300 text-bg hover:text-primary">
//           {email}
//         </a>
//       )}
//     </div>
//   </div>
// );

// const ToggleButton = ({ active, onClick, icon, text }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//       active ? 'bg-bg text-white' : 'bg-white text-bgVariant hover:bg-gray-100'
//     }`}
//   >
//     {icon}
//     {text}
//   </button>
// );

// const Input = ({ name, type = "text", placeholder }) => (
//   <input
//     type={type}
//     name={name}
//     placeholder={placeholder}
//     required
//     className="w-full px-4 py-2 mb-4 text-sm bg-white border-2 border-transparent rounded-lg outline-none text-bgVariant focus:ring-2 focus:ring-bg focus:border-bg"
//   />
// );

// export default RequestFeatureReportIssue;