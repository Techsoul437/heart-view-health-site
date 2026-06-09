"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const pathname = usePathname();

  const [visible, setVisible] = useState(true);
  const [hide, setHide] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    setHide(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 15);

    const t1 = setTimeout(() => {
      setHide(true);
    }, 1600);

    const t2 = setTimeout(() => {
      setVisible(false);
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <>
      <div className={`loader-overlay ${hide ? "loader-hide" : ""}`}>
        <div className="loader-content">
          <h1 className="brand-text">HeartView Health</h1>

          <div className="percentage">{progress}%</div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .loader-overlay {
          position: fixed;
          inset: 0;
          z-index: 999999;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          transition:
            opacity 0.6s ease,
            visibility 0.6s ease;
        }

        .loader-hide {
          opacity: 0;
          visibility: hidden;
        }

        .loader-content {
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          text-align: center;
          padding: 0 20px;
        }

        .brand-text {
          margin: 0;
          color: #2f5ba5;
          font-weight: 600;
          letter-spacing: 4px;
          line-height: 1.1;
          font-size: clamp(2rem, 6vw, 5rem);
          word-break: break-word;
        }

        .percentage {
          font-size: clamp(1rem, 3vw, 1.4rem);
          font-weight: 700;
          color: #555;
        }

        .progress-track {
          width: min(320px, 85vw);
          height: 8px;
          background: #edf2f7;
          border-radius: 999px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.05s linear;
          background: linear-gradient(
            90deg,
            #2f5ba5,
            #5d8ff0,
            #2f5ba5
          );
        }

        @media (max-width: 1024px) {
          .brand-text {
            font-size: clamp(2rem, 7vw, 4rem);
          }
        }

        @media (max-width: 768px) {
          .loader-content {
            gap: 16px;
            padding: 0 16px;
          }

          .brand-text {
            font-size: clamp(1.8rem, 8vw, 3rem);
            letter-spacing: 2px;
          }

          .progress-track {
            width: 80vw;
            height: 6px;
          }
        }

        @media (max-width: 480px) {
          .loader-content {
            gap: 14px;
            padding: 0 12px;
          }

          .brand-text {
            font-size: clamp(1.5rem, 9vw, 2.3rem);
            letter-spacing: 1px;
          }

          .percentage {
            font-size: 16px;
          }

          .progress-track {
            width: 85vw;
          }
        }

        @media (max-width: 360px) {
          .brand-text {
            font-size: 1.4rem;
          }

          .progress-track {
            width: 90vw;
          }
        }
      `}</style>
    </>
  );
}