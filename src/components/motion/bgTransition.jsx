import { useEffect, useState, useRef } from "react";

export default function BgTransition() {
  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-1 overflow-hidden">
        <div className="">
          <div className="absolute inset-0 w-full h-full bg-[#9b73d4]" />
          <div
            aria-hidden="true"
            className="absolute inset-0 w-full h-full "
            style={{
              background:
                "linear-gradient(135deg, #3853F0 0%, transparent 50%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 w-full h-full "
            style={{
              background: "linear-gradient(45deg, #78CEFF 0%, transparent 50%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 w-full h-full "
            style={{
              background:
                "linear-gradient(225deg, #FF9ECF 0%, transparent 50%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 w-full h-full "
            style={{
              background:
                "linear-gradient(315deg, #BD0B91 0%, transparent 50%)",
            }}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-full h-full bg-bottom-right bg-no-repeat"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 65%, rgba(255, 255, 255, 0.5), transparent 40%)",
          }}
        />
      </div>
    </>
  );
}
