"use client";

import { useState } from "react";

export function HeroCandidateImage() {
  const [src, setSrc] = useState("/candidate-profile.png");

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Professional candidate profile"
        className="h-full w-full object-contain object-bottom"
        onError={() => setSrc("/candidate-placeholder.svg")}
      />
    </>
  );
}
