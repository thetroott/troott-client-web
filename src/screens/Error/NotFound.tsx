import { useLocation } from "react-router-dom";

const Notfound = () => {
  const location = useLocation();

    return (
      <>
        <div>
          <h2>Error 404: {location.state?.message}</h2>
        </div>
      </>
    );
  };
  
  export default Notfound;
  