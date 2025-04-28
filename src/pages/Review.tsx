import TextArea from "../components/input/TextAreaInput";
import TextInput from "../components/input/TextInput";
import Review from "../components/Review";


const Preview = () => {
  

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
        placeholder="Email"
        name="email"
        id="email"
        hasIcon={true}
        icon="mail"
        defaultValue=""
        className="form-control"
        showFocus={true}
        onChange={(e) => {
          console.log(e.target.value);
        }}
        
        />

    </div>
    
  );
};

export default Preview;
