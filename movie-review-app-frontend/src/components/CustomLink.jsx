/* eslint-disable react/prop-types */
import {Link} from 'react-router-dom'


const CustomLink = ({children, to}) => 
<Link to={to} className='text-dark-subtle hover:text-white transition'>
    {children}
</Link>;


export default CustomLink;