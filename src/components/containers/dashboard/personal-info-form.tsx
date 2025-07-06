import CountrySelect from "@/components/containers/dashboard/CountrySelect";
import { IoDocumentAttach, IoIdCard } from "react-icons/io5";
import { IconText } from "./IconText";
import LegalNameInput from "./LegalNameInput";
import DateOfBirthPicker from "./DOBPicker";

const PersonalInfoForm = () => {
  

  return (
    <>
      <div className="">
        <CountrySelect />

        <h2 className="text-[15px] font-medium mt-6 text-muted-foreground">
          Complete the following steps to verify your account in <br />{" "}
          <span className="font-bold text-foreground">7 minutes</span>
        </h2>

        <IconText
          icon={IoIdCard}
          text="Personal information"
          className="text-sm text-muted-foreground mt-4"
        />

        <IconText
          icon={IoDocumentAttach}
          text="Government-issued ID"
          className="text-sm text-muted-foreground mt-2"
        />


        <LegalNameInput
          id="Legal-name"
          firstName="Damola"
          lastName="Oladipo"
          label="Legal Name"
          description="As shown on your government-issued ID"
          // description="This will be your legal name on your account"
          className="mt-8 "
        />

        <DateOfBirthPicker
          label="Date of Birth"
          className="mt-6"

        />
      

      </div>
    </>
  );
};

export default PersonalInfoForm;
