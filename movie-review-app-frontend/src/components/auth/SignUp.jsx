import Container from '../Container'
import FormTitle from '../form/FormTitle'
import FormInput from '../form/FormInput'
import SubmitBtn from '../form/SubmitBtn'


export default function SignUp() {
  return (
    <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center '>
        <Container>
            <form action="" className='bg-secondary rounded p-6 w-72 space-y-4'>
                <FormTitle>Sign Up</FormTitle>
                <FormInput name="name" placeholder="John Doe" label="Name"/>
                <FormInput name="email" placeholder="john@example.com" label="Email"/>
                <FormInput name="password" placeholder="********" label="Password"/>
                <SubmitBtn>Sign Up</SubmitBtn>
                <div className="flex justify-between">
                    <a href="" className='text-dark-subtle hover:text-white transition'>Forget Password</a>
                    <a href="" className='text-dark-subtle hover:text-white transition'>Sign In</a>
                </div>
            </form>
        </Container>
    </div>
  )
}
