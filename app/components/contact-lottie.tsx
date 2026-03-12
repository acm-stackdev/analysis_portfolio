"use client";

import { useLottie } from "lottie-react";
import animationData from "../../public/contact us.json";

export const ContactLottie = () => {
  const defaultOptions = {
    animationData: animationData,
    loop: true,
  };

  const { View } = useLottie(defaultOptions);

  return (
    <div>
      <div className="w-full">{View}</div>
    </div>
  );
};

export default ContactLottie;
