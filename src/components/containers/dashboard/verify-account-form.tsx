import CountrySelect from "@/components/partials/CountrySelect";
import type { IForm } from "@/utils/interfaces.util";
import { useNavigate } from "react-router-dom";



const VerifyAccountForm = (data: IForm) => {
  const { className, ...props } = data;
  const navigate = useNavigate();
  

  return (
    <>

    <div className="w-full ">
       <CountrySelect/>
    
    </div>

   
    </>
  );
};

export default VerifyAccountForm;
