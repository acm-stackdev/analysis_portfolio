import { RoughNotation } from "react-rough-notation";

export const AboutSection = () => {
  return (
    <section id="about" className="w-full text-center">
      <RoughNotation
        type="circle"
        show={true}
        animationDuration={1500}
        animationDelay={500}
      >
        About
      </RoughNotation>
    </section>
  );
};
