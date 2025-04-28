import TextArea from "../components/input/TextAreaInput";
import Review from "../components/Review";


const Preview = () => {
  

  return (
    <Review>
        <TextArea
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
        />
    </Review>
  );
};

export default Preview;
