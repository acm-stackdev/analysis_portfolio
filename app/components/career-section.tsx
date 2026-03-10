import { RoughNotation } from "react-rough-notation";

export const CareerSection = () => {
  return (
    <section
      id="career"
      className="w-full min-h-[95vh] text-center custom-grid"
    >
      <div className="p-10 text-2xl font-bold">
        <RoughNotation
          type="circle"
          show={true}
          animationDuration={1500}
          animationDelay={500}
        >
          Professional Journey
        </RoughNotation>
      </div>
    </section>
  );
};
