// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";



// export default function LoginForm() {
//   const router = useRouter();

//   const handleLogin = () => {
//     router.push("/dashboard");
//   };

//   return (
//     <div className="w-full rounded-3xl bg-white p-8 shadow-xl border border-emerald-50">

//       <div className="mb-8 text-center">
//         <h2 className="text-3xl font-bold text-teal-900">
//           Welcome Back
//         </h2>

//         <p className="mt-2 text-gray-600">
//           Sign in to continue using WayZ.
//         </p>
//       </div>
//       <Button
//   variant="outline"
//   className="w-full h-12 rounded-xl mb-5 border-emerald-100 hover:bg-emerald-50 flex items-center justify-center gap-3 text-gray-700"
// >

//   <img
//     src="https://www.svgrepo.com/show/475656/google-color.svg"
//     alt="Google"
//     className="w-5 h-5"
//   />

//   Continue with Google

// </Button>

//       <div className="relative my-6">
//         <div className="border-t border-gray-200"></div>

//         <span className="absolute left-1/2 top-[-12px] -translate-x-1/2 bg-white px-3 text-sm text-gray-500">
//           OR
//         </span>
//       </div>
//       <form className="space-y-5">

//         <div>
//           <label className="text-sm font-medium text-gray-700">
//             Email
//           </label>

//           <Input
//             type="email"
//             placeholder="Enter your email"
//             className="mt-2 h-12 rounded-xl border-emerald-100 focus-visible:ring-teal-600"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium text-gray-700">
//             Password
//           </label>

//           <Input
//             type="password"
//             placeholder="Enter your password"
//             className="mt-2 h-12 rounded-xl border-emerald-100 focus-visible:ring-teal-600"
//           />
//         </div>

//         <Button
//           type="button"
//           onClick={handleLogin}
//           className="w-full h-12 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-base"
//         >
//           Sign In
//         </Button>

//       </form>

//       <p className="mt-6 text-center text-sm text-gray-600">
//         Don&apos;t have an account?{" "}
//         <Link
//           href="/auth/signup"
//           className="text-teal-700 font-semibold hover:underline"
//         >
//           Sign Up
//         </Link>
//       </p>

//     </div>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Login successful!");

      router.push("/dashboard");

    } catch (error) {
      console.error(error);

      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-3xl bg-white p-8 shadow-xl border border-emerald-50">

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-teal-900">
          Welcome Back
        </h2>

        <p className="mt-2 text-gray-600">
          Sign in to continue to Wayz.
        </p>
      </div>

      {/* GOOGLE BUTTON */}
      <Button
        variant="outline"
        className="w-full h-12 rounded-xl mb-5 border-emerald-100 hover:bg-emerald-50 flex items-center justify-center gap-3 text-gray-700"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />

        Continue with Google
      </Button>

      {/* DIVIDER */}
      <div className="relative my-6">
        <div className="border-t border-gray-200"></div>

        <span className="absolute left-1/2 top-[-12px] -translate-x-1/2 bg-white px-3 text-sm text-gray-500">
          OR
        </span>
      </div>

      {/* FORM */}
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >

        <div>
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>

          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="mt-2 h-12 rounded-xl border-emerald-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>

          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="mt-2 h-12 rounded-xl border-emerald-100"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-base"
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>

      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-teal-700 font-semibold hover:underline"
        >
          Create Account
        </Link>
      </p>

    </div>
  );
}