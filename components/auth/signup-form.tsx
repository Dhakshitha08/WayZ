"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

export default function SignupForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
  try {
    setLoading(true);

    // CHECK USERNAME
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .single();

    if (existingUser) {
      alert("Username already taken");
      return;
    }

    // CREATE AUTH USER
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // SAVE PROFILE DATA
    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          username,
          email,
        });

      if (profileError) {
        alert(profileError.message);
        return;
      }
    }

    alert("Account created successfully!");

    router.push("/dashboard");

  } catch (error) {
    console.error(error);

    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
};
const handleGoogleLogin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/dashboard",
    },
  });
};
  return (
    <div className="w-full rounded-3xl bg-white p-8 shadow-xl border border-emerald-50">

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-teal-900">
          Create Account
        </h2>

        <p className="mt-2 text-gray-600">
          Join Wayz and help improve communities.
        </p>
      </div>

      {/* GOOGLE BUTTON */}
      {/* <Button
        variant="outline"
        className="w-full h-12 rounded-xl mb-5 border-emerald-100 hover:bg-emerald-50 flex items-center justify-center gap-3 text-gray-700"
        onClick={handleGoogleLogin}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />

        Continue with Google
      </Button> */}

      {/* DIVIDER */}
      {/* <div className="relative my-6">
        <div className="border-t border-gray-200"></div>

        <span className="absolute left-1/2 top-[-12px] -translate-x-1/2 bg-white px-3 text-sm text-gray-500">
          OR
        </span>
      </div> */}

      {/* FORM */}
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <div>
  <label className="text-sm font-medium text-gray-700">
    Username
  </label>

  <Input
    type="text"
    placeholder="Choose a username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    className="mt-2 h-12 rounded-xl border-emerald-100"
    required
  />
</div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>

          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 h-12 rounded-xl border-emerald-100"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>

          <Input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 h-12 rounded-xl border-emerald-100"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-base"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-teal-700 font-semibold hover:underline"
        >
          Sign In
        </Link>
      </p>

    </div>
  );
}