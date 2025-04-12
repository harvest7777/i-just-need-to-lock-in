"use client";

import { toast, Toaster } from "sonner";

export default function PlaygroundPage() {
  return (
    <div>
      <Toaster richColors position="top-right" />
      <button className="btn-hover" onClick={() => toast('Toast')}>Render Toast</button>;
    </div>
  )
}
