import React from 'react'
import Container from '../Container'
import FormTitle from '../form/FormTitle'
import FormInput from '../form/FormInput'
import SubmitBtn from '../form/SubmitBtn'


export default function SignIn() {
  return (
    <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center '>
        <Container>
            <form action="" className='bg-secondary rounded p-6 w-72 space-y-4'>
                <FormTitle>Sign In</FormTitle>
                <FormInput name="email" placeholder="name@example.com" label="Email"/>
                <FormInput name="password" placeholder="********" label="Password"/>
                <SubmitBtn>Sign In</SubmitBtn>
                <div className="flex justify-between">
                    <a href="" className='text-dark-subtle hover:text-white transition'>Forget Password</a>
                    <a href="" className='text-dark-subtle hover:text-white transition'>Sign Up</a>
                </div>
            </form>
        </Container>
    </div>
  )
}
