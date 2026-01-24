import Image from "next/image";

export const HomeSection = () => {
  return (
    <>
      <section className="min-h-screen w-full flex items-center justify-center px-4">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-justify">
            <span className="text-xl md:text-2xl text-primary">
              Hi, my name is
            </span>
            <h1 className="text-3xl md:text-6xl font-bold mt-2">John Tin</h1>
            <h1 className="text-2xl md:text-4xl text-primary mt-2">
              A Data Analyst
            </h1>
            <p className="text-md md:text-lg mt-4">
              I am a Data Analyst with a strong passion for turning data into
              meaningful insights and actionable decisions. With expertise in
              data analysis, data visualization, and statistical thinking, I
              combine analytical skills with business understanding to identify
              patterns, optimize processes, and support data-driven
              decision-making across organizations.
            </p>
          </div>
          <div className="flex justify-end">
            <Image
              src="/profile.jpg"
              className="rounded-4xl"
              alt="Profile"
              width={300}
              height={500}
            />
          </div>
        </div>
      </section>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary mt-2 rounded-full animate-bounce"></div>
        </div>
      </div>
    </>
  );
};
