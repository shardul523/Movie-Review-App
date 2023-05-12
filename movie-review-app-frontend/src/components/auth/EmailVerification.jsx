import { useState } from 'react';
import Container from '../Container'
import FormTitle from '../form/FormTitle'
import SubmitBtn from '../form/SubmitBtn'


const OTPLength = 6;

export default function EmailVerification() {
  
  const [otp, setOTP] = useState(Array.from({length: OTPLength}));

  const handleInput = ({target}, index) => {
    const {value} = target;
    // setOTP(value);

  };

  return (
    <div className='fixed inset-0 bg-primary -z-10 flex justify-center items-center '>
        <Container>
            <form action="" className='bg-secondary rounded p-6 space-y-6'>
                <div>
                  <FormTitle>Please Enter The OTP to verify your account</FormTitle>
                  <p className='text-center text-dark-subtle'>OTP has been sent to your registered email</p>
                </div>

                <div className='flex justify-between'>
                  {otp.map((val, i) => {
                    return (
                      <input type="number" name="" id="" className='h-12 w-12 bg-transparent outline-none 
                      border-2 border-dark-subtle rounded focus:border-white text-white text-xl text-center' 
                      key={i} value={val || ''} onChange={(e) => handleInput(e, i)}/>
                    )
                  })}
                </div>
                
                <SubmitBtn>Send Link</SubmitBtn>
            </form>
        </Container>
    </div>
  )
}
