import {Field , ErrorMessage} from 'formik';
import PropTypes from 'prop-types';

const TextField = ({label , name , type= 'text', placeholder , className}) =>{
  return (
    <div className='space-y-1'>
      <label htmlFor={name} className='text-sm font-medium text-gray-300 block'>
        {label}
      </label>
      <Field
        name={name} 
        type={type} 
        placeholder={placeholder} 
        className={className}
        />
      <ErrorMessage component="div" name={name} className="text-red-500 text-sm mt-1" />
    </div>
  )
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Adjust based on your needs
  onChange: PropTypes.func.isRequired,
};

export default TextField;