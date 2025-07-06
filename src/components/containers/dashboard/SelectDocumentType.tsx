import { useState } from "react";
import IconRadioSelect from "./IconRadioSelect";
import { IoIdCard } from "react-icons/io5";
import { FaPassport } from "react-icons/fa";

const SelectDocumentType = () => {
  const [contactType, setContactType] = useState("email");

  return (
    <IconRadioSelect
      value={contactType}
      onChange={setContactType}
      options={[
        {
          label: "National Identity Number (NIN)",
          value: "nin",
          icon: <IoIdCard className="w-5 h-5" />,
        },
         {
          label: "Driver’s License",
          value: "drivers-license",
          icon: <IoIdCard className="w-5 h-5" />,
        },
        {
          label: "International Passport",
          value: "passport",          
          icon: <FaPassport className="w-5 h-5" />,
        },
      ]}
    />
  );
};

export default SelectDocumentType;
