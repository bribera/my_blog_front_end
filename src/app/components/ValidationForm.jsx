import React from 'react'

const ValidationForm = (formData) => {

    let error = {}

    if(!formData.name || formData.name.trim() === '') {
        error.name = 'Name is Required'
    }

    if (!formData.email || formData.email.trim() === '') {
        error.email = 'Email is Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        error.email = 'Email Is Invalid';
    }
    


    if(!formData.message || formData.message.trim() === '') {
        error.message = 'Message is Required'
    }

  return error
}

export default ValidationForm
