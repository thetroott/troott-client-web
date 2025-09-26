import ResetPasswordForm from "@/components/containers/auth/reset-password";
import { AuthLayout } from "@/components/layouts/Authlayout";
import { useState } from "react";

const ResetPassword = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      <AuthLayout
        title={showSuccess ? "" : "Reset your password"}
        description={showSuccess ? "" : "Enter your new password below"}
        hideHeaderOnSuccess={showSuccess}
      >
        <ResetPasswordForm onSuccess={() => setShowSuccess(true)} />
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
