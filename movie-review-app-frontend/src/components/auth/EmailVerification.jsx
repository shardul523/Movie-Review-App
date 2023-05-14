import { useState, useRef, useEffect } from 'react';
import Container from '../Container'
import FormTitle from '../form/FormTitle'
import SubmitBtn from '../form/SubmitBtn'


const OTPLength = 6;

export default function EmailVerification() {
  
  const [otp, setOTP] = useState(Array.from({length: OTPLength}, () => ''));
  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const activeInput = useRef();

  const gotoPrevField = (i) => setActiveInputIndex(Math.max(i - 1, 0));

  const handleBackspace = ({key}, index) => {
    if (otp[index]) return;
    if (key !== 'Backspace') return;
    gotoPrevField(index);
  }

  const handleInput = ({target}, index) => { 

    const {value} = target;
    const newOTP = [...otp];
    newOTP[index] = value.slice(-1);
    setOTP(newOTP);
    
    if (value)
      setActiveInputIndex((prev) => Math.min(prev + 1, OTPLength - 1));
  };

  useEffect(() => {
    activeInput.current.focus();
  }, [activeInputIndex])

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
                      <input type="number" name="" id="" onKeyDown={(e) => handleBackspace(e, i)}
                      className='h-12 w-12 bg-transparent outline-none border-2 border-dark-subtle rounded 
                      focus:border-white text-white text-xl text-center' required key={i} value={val} 
                      onChange={(e) => handleInput(e, i)} ref={activeInputIndex === i ? activeInput : null}/>
                    )
                  })}
                </div>
                
                <SubmitBtn>Send Link</SubmitBtn>
            </form>
        </Container>
    </div>
  )
}
