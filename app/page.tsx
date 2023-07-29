// import Image from 'next/image'
import UserAuthForm from "@/components/UserAuthForm";

export default function LoginPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-8 flex flex-col space-y-2 text-center">
        <h1 className="tracking-light text-2xl font-semibold">
          Login your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your username below to login your account
        </p>
      </div>
      <UserAuthForm />
    </div>
  );
}
