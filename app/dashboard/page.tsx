"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { getCurrentUser } from "@/lib/get-user";

import LogoutButton from "@/components/auth/logout-button";

export default function DashboardPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkUser = async () => {

      const user = await getCurrentUser();

      if (!user) {
        router.replace("/auth/login");
        return;
      }

      setLoading(false);
    };

    checkUser();

  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4FBF8]">
        <p className="text-teal-700 text-lg font-medium">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4FBF8] p-10">

      <h1 className="text-4xl font-bold text-teal-900">
        Wayz Dashboard
      </h1>

      <p className="mt-4 text-gray-600">
        Authentication is working successfully.
      </p>

      <div className="mt-8">
        <LogoutButton />
      </div>

    </main>
  );
}