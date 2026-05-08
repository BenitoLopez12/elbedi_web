import { useEffect, useState, useRef } from "react";

export default function BgTransition() {
  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-1 overflow-hidden">
        <div className="">
          <div className="absolute inset-0 w-full h-full bg-[#9970d1]" />
          <div
            aria-hidden="true"
            className="absolute inset-0 w-full h-full "
            style={{
              background:
                "linear-gradient(135deg,rgb(75, 100, 240) 0%, rgba(0, 0, 0, 0) 50%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 w-full h-full "
            style={{
              background:
                "linear-gradient(45deg,rgb(104, 174, 254) 0%, rgba(0, 0, 0, 0) 50%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 w-full h-full "
            style={{
              background:
                "linear-gradient(225deg,rgba(255, 153, 204, 1) 0%, rgba(0, 0, 0, 0) 50%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 w-full h-full "
            style={{
              background:
                "linear-gradient(315deg,rgba(181, 26, 142, 1) 0%, rgba(0, 0, 0, 0) 50%)",
            }}
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-full h-full bg-bottom-right bg-no-repeat"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 65%, rgba(0, 0, 0, 0.3), transparent 30%)",
          }}
        />
      </div>
    </>
  );
}
