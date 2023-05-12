import Container from '../Container'
import FormTitle from '../form/FormTitle'
import FormInput from '../form/FormInput'
import SubmitBtn from '../form/SubmitBtn'
import CustomLink from '../CustomLink'


export default function ForgetPassword() {
  return (
    <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center '>
        <Container>
            <form action="" className='bg-secondary rounded p-6 w-96 space-y-4'>
                <FormTitle>Please Enter Your Email</FormTitle>
                <FormInput name="email" placeholder="name@example.com" label="Email"/>
                <SubmitBtn>Send Link</SubmitBtn>
                <div className="flex justify-between">
                    <CustomLink to="/auth/sign-in">Sign In</CustomLink>
                    <CustomLink to="/auth/sign-up">Sign Up</CustomLink>
                </div>
            </form>
        </Container>
    </div>
  )
}
