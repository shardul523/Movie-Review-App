

export default function FormInput({name, placeholder, label, ...rest}) {
  return (
    <div className='flex flex-col-reverse'>
        
        <input type="text" className='bg-transparent 
        rounded border-2 border-dark-subtle focus:border-white 
        w-full text-lg outline-none p-1 text-white peer' 
        placeholder={placeholder} name={name} id={name} {...rest}/>
        
        <label htmlFor={name} className='font-semibold text-dark-subtle
        peer-focus:text-white self-start transition'>
            {label}
        </label>
    </div>
  )
}
