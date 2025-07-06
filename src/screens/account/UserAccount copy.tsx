import PageHeader from "@/components/containers/dashboard/PageHeader";
import VerifyDocumentForm from "@/components/containers/dashboard/verify-document";

function VerifyDocument() {
  return (
    <>
      <div className="mb-10">
        <PageHeader
          title="Document Verification"
          description="Your ID will be used to verify your personal information."
        />
      </div>

      <div className="mt-8 mx-auto pr-80">
        <VerifyDocumentForm />
      </div>
    </>
  );
}

export default VerifyDocument;
