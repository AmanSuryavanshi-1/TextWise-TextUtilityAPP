import React, { useRef, useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { BsWhatsapp, BsSend } from 'react-icons/bs';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';

const Contact = () => {
  const form = useRef();
  const [isMessageSent, setIsMessageSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_ugqrpcu', 'template_iz5pcva', form.current, 'I0BXSqsH7YBt5ciXX')
      .then(() => {
        setIsMessageSent(true);
        setTimeout(() => setIsMessageSent(false), 5000);
        e.target.reset();
      }, (error) => {
        console.error('Email sending failed:', error);
      });
  };

  return (
    <div className="flex items-start justify-center min-h-[94vh] py-8 px-4 sm:px-8 font-sans bg-primaryVariant">
      <div className="w-full rounded-3xl my-auto max-w-[58rem] shadow-2xl">
        <div className="w-full h-full transition-all ease-in-out duration-600">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-0">
            {/* Contact Info */}
            <div className="flex flex-col px-6 py-8 sm:px-12 bg-bgVariant text-bg rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
              <h2 className="mb-6 font-serif text-2xl font-bold text-center text-white sm:text-3xl">Get in Touch</h2>
              <div className="flex flex-col justify-center flex-grow space-y-6 sm:space-y-10">
                <ContactCard
                  icon={<HiOutlineMail className="text-3xl sm:text-4xl" />}
                  title="Email"
                  content="adude890@gmail.com"
                  link="mailto:adude890@gmail.com"
                  linkText="Send an email"
                />
                <ContactCard
                  icon={<BsWhatsapp className="text-3xl sm:text-4xl" />}
                  title="WhatsApp"
                  content="+91 8745030106"
                  link="https://api.whatsapp.com/send?phone=+918745030106&text=Hello%20there!"
                  linkText="Chat on WhatsApp"
                />
              </div>
            </div>

            {/* Contact Form */}
            <form ref={form} onSubmit={sendEmail} className="relative flex flex-col px-6 py-8 sm:px-12 bg-gradient-to-br from-primary to-primaryVariant rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none">
              
              {isMessageSent && (
                <p className="absolute top-[-30px] left-0 right-0 mx-auto mb-4 text-center text-sm font-semibold text-primaryVariant bg-bg p-2 rounded-lg shadow-md w-72 animate-fadeIn">
                  Message sent successfully!
                </p>
              )}

              <h2 className="mb-6 font-serif text-2xl font-bold text-center sm:text-3xl text-bg">Send us a message</h2>
              <div className="flex flex-col justify-center flex-grow">
                <Input name="name" placeholder="Your Full Name" />
                <Input name="email" type="email" placeholder="Your Email" />
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  required
                  className="w-full px-4 py-4 mb-4 overflow-y-auto text-sm transition-all duration-300 bg-white border-2 border-transparent rounded-lg outline-none scrollbar-thin scrollbar-thumb-bgVariant scrollbar-track-primary text-bgVariant focus:ring-2 focus:ring-primaryVariant focus:border-bg max-h-40"
                ></textarea>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-2 mx-16 font-semibold text-white transition-all duration-300 border-2 rounded-full bg-bg hover:bg-bgVariant border-bg">
                  <BsSend className="mr-2 text-base" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, content, link, linkText }) => (
  <div className="flex items-center p-4 space-x-3 transition-all duration-300 bg-white shadow-md sm:p-5 sm:space-x-4 rounded-xl hover:shadow-lg hover:transform hover:scale-105">
    <div className="m-1 rounded-full sm:p-4 text-primaryVariant bg-bg">{icon}</div>
    <div>
      <h4 className="text-base font-semibold sm:text-lg">{title}</h4>
      <p className="mb-1 text-xs text-bgVariant sm:text-sm">{content}</p>
      <Link to={link} className="block text-xs font-semibold transition-colors duration-300 sm:text-sm text-bg hover:text-primary hover:underline">
        {linkText}
      </Link>
    </div>
  </div>
);

const Input = ({ name, type = "text", placeholder }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    required
    className="w-full px-4 py-2 mb-4 text-sm transition-all duration-300 bg-white border-2 border-transparent rounded-lg outline-none text-bgVariant focus:ring-2 focus:ring-primaryVariant focus:border-bg"
  />
);

export default Contact;
