"use client";
import { useRef } from "react";
import html2canvas from "html2canvas";

export default function Share() {
  const shareRef = useRef<HTMLDivElement | null>(null);
  const screenshotAndShare = async () => {
    if (!shareRef.current) return;
    const canvas = await html2canvas(shareRef.current);
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);

        alert("Screenshot copied to clipboard!");
      });
    } catch (err) {
      console.error("Failed to copy screenshot:", err);
    }
  };

  return (
    <div>
      <button onClick={() => screenshotAndShare()}>click me </button>
      <div ref={shareRef}>
        <p>this will be some asdlfsautsa</p>
        <p>this will be some asdlfsautsa</p>
        <p>this will be some asdlfsautsa</p>
        <p>this will be some asdlfsautsa</p>
      </div>
    </div>
  );
}
