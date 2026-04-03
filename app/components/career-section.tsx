import { CareerWrapper } from "./carrer-wrapper";
import { getExperienceData } from "@/actions/experience";

export const CareerSection = async () => {
  const experienceData = await getExperienceData();
  return <CareerWrapper careerData={experienceData} />;
};
