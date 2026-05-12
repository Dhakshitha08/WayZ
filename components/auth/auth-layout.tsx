import Image from "next/image";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#F4FBF8] flex items-center justify-center p-4 lg:p-8">

      <div className="w-full max-w-7xl min-h-[90vh] grid lg:grid-cols-2 rounded-[32px] overflow-hidden shadow-2xl border border-white/40 bg-white/60 backdrop-blur-xl">

        {/* LEFT PANEL */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-teal-700 to-emerald-500 text-white relative overflow-hidden px-16 py-20">

          <div className="max-w-lg flex flex-col justify-center h-full">

            {/* BRAND */}
            <div className="flex items-center gap-5 mb-10">

  <div className="bg-white/15 backdrop-blur-md rounded-[28px] p-5 border border-white/20 shadow-xl">
    <Image
      src="/logo.png"
      alt="Wayz Logo"
      width={130}
      height={130}
      className="rounded-2xl object-contain w-auto h-auto"
    />
  </div>

  <div>
    <h1 className="text-6xl font-bold tracking-tight">
      WayZ
    </h1>

    <p className="mt-2 text-xl text-white/90">
      Report • Connect • Resolve
    </p>
  </div>

</div>

            {/* CONTENT */}
            <div className="space-y-6">
              <h2 className="text-4xl font-semibold leading-tight">
                Smarter civic issue reporting for modern communities.
              </h2>

              <p className="text-lg text-white/80 leading-relaxed">
                Connect citizens, authorities, and local services
                through a clean and intelligent reporting platform.
              </p>
            </div>

          </div>

          {/* Decorative Blur */}
          <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-white/20 rounded-full blur-3xl" />
        </div>

        {/* RIGHT PANEL */}
        <div className="flex min-h-[90vh] items-center justify-center bg-white/70 backdrop-blur-xl px-6 py-12 lg:px-16">

          <div className="w-full max-w-md flex items-center justify-center">
            {children}
          </div>

        </div>

      </div>

    </main>
  );
}