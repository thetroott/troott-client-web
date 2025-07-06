import PageHeader from "@/components/containers/dashboard/PageHeader";
import PersonalInfoForm from "@/components/containers/dashboard/personal-info-form";

function PersonalInfo() {
  return (
    <>
      <div className="mb-10">
        <PageHeader
          title="Personal Information"
          description="Please provide the following information as shown on your passport or ID card."
        />
      </div>

      <div className="mt-8 mx-auto pr-80">
        <PersonalInfoForm />
      </div>
      
    </>
  );
}

export default PersonalInfo;
