import PageHeader from "@/components/containers/dashboard/PageHeader";
//import VerifyDocumentForm from "@/components/containers/dashboard/verify-document";
import { Outlet } from "react-router-dom";

function VerifyDocument() {
  return (
    <>
      <div className="mb-8">
        <PageHeader
          title="Document Verification"
          description="Your ID will be used to verify your personal information."
        />
      </div>

      <div className="mt-8 mx-auto pr-80 ">
        <Outlet/>
        {/* <VerifyDocumentForm /> */}
        
      </div>
    </>
  );
}

export default VerifyDocument;
