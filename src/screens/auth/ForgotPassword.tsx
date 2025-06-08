import { ForgotPasswordForm } from "@/components/containers/forgot-password";
import { AuthLayout } from "@/components/layouts/Authlayout";

const ForgotPassword = () => {
  return (
    <>
      <AuthLayout
        title="Forgot your password?"
        description="Enter your email address and we'll send you a link to reset your password"
      >
        <ForgotPasswordForm />
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
