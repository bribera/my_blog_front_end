'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import Button from './Button'
import { useFormik } from 'formik';
import ValidationForm from './ValidationForm'


const Contact = () => {


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value
     });
  };

   
   if (errors[name]) {
    setErrors(prevState => ({
      ...prevState,
      [name]: ''
    }));
  }

  

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const validationErrors = ValidationForm(formData);
    setErrors(validationErrors);
    
    
    if (Object.keys(validationErrors).length === 0) {

      setStatus({ isSubmitting: true, isSuccess: false, error: null });


      try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: formData })
        });
  
        if (!response.ok) {
          throw new Error('Failed to submit message');
        }

        setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
   
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
        
      }  catch (error) {
        console.error('Error:', error);
        setErrors({ submit: 'Failed to send message' });
      } finally {
        setStatus({ isSubmitting: false, isSuccess: true, error: null });
      }


   }
   
  };

  console.log(4);
    console.log(formData);

  return (
    <div className=" pt-[160px] pb-[60px]  gap-[20px] px-[60px] ">
      <div className="flex items-center bg-slate-300">
        {/* left */}
        <div className="flex-1">
          <img alt="contact photo" 
            src="/contact.png" 
            width={300} 
            height={300} 
            className="w-full h-full"
            />
        </div>
        {/* right */}
        <div className="flex-1 px-[20px]">
          <div className="flex flex-col gap-[30px]">

            <h1 className="text-[40px] font-semibold">Contactez-nous</h1>

            <form method="POST" onSubmit={handleSubmit} className="flex flex-col gap-[20px] bg-slate-200 px-3 py-4">
              <input
                type="text"
                name="name"
                placeholder="Nom"
                value={formData.name}
                onChange={handleChange}
                required
                className="px-1 py-2 border-none bg-slate-100 focus:outline-none"
              />
              {errors.name && <p className="text-red-400">{errors.name}</p>}
              
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-1 py-2 border-none bg-slate-100 focus:outline-none"
              />
              {errors.email && <p className="text-red-400">{errors.email}</p>}
              
              <input
                type="text"
                name="subject"
                placeholder="Sujet"
                value={formData.subject}
                onChange={handleChange}
          
                className="px-1 py-2 border-none bg-slate-100 focus:outline-none"
              />
              
              <textarea
                name="message"
                placeholder="Votre message"
                value={formData.message}
                onChange={handleChange}
                required
                className="px-1 py-2 border-none bg-slate-100 focus:outline-none"
              ></textarea>
              {errors.message && <p className="text-red-400">{errors.message}</p>}

              <Button type="submit" onClick={() => console.log('clicked')}  disabled={status.isSubmitting}>
                {status.isSubmitting ? 'Envoi en cours...' : 'Envoyer'}

              </Button>
            </form>
            
            {submitted && <p className='text-green-500 font-medium italic'>Votre message a été envoyé avec succès !</p>}
            
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
