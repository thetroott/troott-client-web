import { useState } from "react";
import TextArea from "../components/input/TextAreaInput";
import TextInput from "../components/input/TextInput";
import Review from "../components/Review";


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
    <div  className="review-page-container">
    
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

        <TextInput
        type="email"
        placeholder="Enter your email"
        name="email"
        id="email"
        label="Email"
        hasIcon={true}
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
        />

        <div className="mrgb10"></div>
{/* 
        <TextInput
          id="password"
          name="password"
          type="number"
          icon="fe-at-sign"
          hasIcon={true}
          defaultValue=""
          className="form-control"
          showFocus={true}
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          label="Password"
          autoComplete
          color="secondary"
          variant="outlined"
          error={formData.password.length < 6}
          helperText={formData.password.length < 6 ? "Password must be at least 6 characters" : ""}
        /> */}

    </div>
    
  );
};

export default Preview;
