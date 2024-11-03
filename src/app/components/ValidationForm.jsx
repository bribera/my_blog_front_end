import React from 'react'

const ValidationForm = () => {

    let error = {}

    if(!formData.name) {
        error.name = 'Name is Required'
    }

    if(!formData.email) {
        error.email = 'Name is Required'
    }else if (!!/[*\s@]+@[*\s@]+\.[*\s@]+/.test(formData.
        email)){
            error.email="Email Is Invalid"
        }

    if(!formData.message) {
        error.message = 'Name is Required'
    }

  return error
}

export default ValidationForm
