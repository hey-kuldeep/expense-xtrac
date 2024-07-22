// validation.js

const validateForm = (formData) => {
    let errors = {};
  
    // Validate fullname
    if (!formData.fullname.trim()) {
      errors.fullname = "Fullname is required";
    } else if (formData.fullname.length < 6) {
      errors.fullname = "Fullname must be at least 6 characters";
    } else if (!/^[a-zA-Z ]+$/.test(formData.fullname)) {
      errors.fullname = "Fullname should contain only letters and spaces";
    }
  
    // Validate password
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
  
    // Validate email
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
  
    // Validate mobile number
    if (!formData.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Mobile number must be 10 digits";
    }
  
    // Validate gender
    if (!formData.gender) {
      errors.gender = "Gender is required";
    }
  
    return errors;
  };
  
  export default validateForm;
  