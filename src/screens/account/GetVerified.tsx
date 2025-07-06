import { Outlet } from "react-router-dom";
import PageHeader from "@/components/containers/dashboard/PageHeader";
import VerifyAccountForm from "@/components/containers/dashboard/verify-account-form";


function UserAccount() {
  return (
    <>
      <div className="mb-10">
        <PageHeader
          title="Let’s get you verified"
          description="Select your residence and follow the steps"
        />
      </div>

      <div className="mt-8 mx-auto pr-80">
        <VerifyAccountForm />
        <Outlet />
      </div>
    </>
  );
}

export default UserAccount;
