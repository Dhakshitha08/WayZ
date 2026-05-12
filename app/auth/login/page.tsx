import AuthLayout from "@/components/auth/auth-layout";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="flex min-h-full w-full items-center justify-center">
        <LoginForm />
      </div>
    </AuthLayout>
  );
}