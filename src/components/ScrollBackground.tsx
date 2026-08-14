"use client";
import { useEffect, useRef, useState } from "react";

const ScrollBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden">
      <div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.35) 0%, transparent 70%)",
          transform: `translateY(${scrollY * 0.15}px)`,
          transition: "transform 0.05s linear",
        }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(var(--accent) / 0.3) 0%, transparent 70%)",
          transform: `translateY(${scrollY * -0.1}px)`,
          transition: "transform 0.05s linear",
        }}
      />
      <div
        className="absolute top-3/4 left-1/3 w-[400px] h-[400px] rounded-full opacity-15 dark:opacity-8 blur-3xl"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)",
          transform: `translate(${scrollY * 0.05}px, ${scrollY * -0.08}px)`,
          transition: "transform 0.05s linear",
        }}
      />
    </div>
  );
};

export default ScrollBackground;
