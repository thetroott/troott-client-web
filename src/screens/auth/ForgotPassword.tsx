

const ForgotPassword = () => {
  return (
    <div>
       <AuthLayout
      title="Forgot your password?"
      description="Enter your email address and we'll send you a link to reset your password"
    >
      <ForgotPasswordForm />
    </AuthLayout>
      
    </div>
  )
}

export default ForgotPassword
