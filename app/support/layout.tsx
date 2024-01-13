import Image from "next/image";
import Process from "../components/Process";
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-[100] flex items-center justify-center">
      <div className="w-3/5 h-min bg-white rounded-xl drop-shadow p-3 flex flex-col gap-5">
        {/* Banner */}
        <div className="bg-[#242424] rounded-xl relative">
          <Image
            src="/banner.png"
            alt="img banner"
            width={800}
            height={100}
            className="w-full h-full object-fill"
          />
          <h1 className="absolute top-1/2 left-1/2 text-[60px]  font-bebas -translate-y-1/2 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
            Support The Team
          </h1>
        </div>

        {/* Process */}
        <Process />

        {children}
      </div>
    </section>
  );
}
