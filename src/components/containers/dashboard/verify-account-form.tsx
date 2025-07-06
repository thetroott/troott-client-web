import CountrySelect from "@/components/containers/dashboard/CountrySelect";

import type { IOnboarding } from "@/utils/interfaces.util";
import { IoDocumentAttach, IoIdCard } from "react-icons/io5";
import { IconText } from "./IconText";

const VerifyAccountForm = (data: IOnboarding) => {
  const { step } = data;
  

  return (
    <>
      <div className="w-full">
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

      </div>
    </>
  );
};

export default VerifyAccountForm;
