import { useState } from "react";
import TextArea from "../components/input/TextAreaInput";
import TextInput from "../components/input/TextInput";
import Review from "../components/Review";
import PasswordField from "../components/ui/PasswordField";

const Preview = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="container review-page-container">
      {/* <TextArea
          placeholder="Review"
          name="review"
          id="review"
          hasIcon={true}
          
          defaultValue=""
    
          className="form-control"
          showFocus={true}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        /> */}

      {/* <TextInput
        type="text"
        placeholder="Enter your email"
        name="email"
        id="email"
        label="Password"
        hasIcon={true}
        iconPosition="left"
        icon="fe-lock"
        color="secondary"
        variant="outlined"        
        value=""
        helperText="password must be at least 6 characters"
        
        className="form-control"
        showFocus={true}
        onChange={(e) => {
          console.log(e.target.value);
        }}
        /> */}

      {/* <div className="pdl40"></div>

        <PasswordInput
        
        placeholder="Enter your password"
        name="password"
        id="password"
        label="Password"
        borderRadius="5px"
        helperText="password must be at least 6 characters"
        
        
        borderColor="#1d79ff"
        hasIcon={true}
        icon="fe-lock"
        style={{
          
          
          
        }}
        
        onChange={handleInputChange}
        /> */}

    </div>
  );
};

export default Preview;
