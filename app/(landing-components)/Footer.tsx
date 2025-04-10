import Link from "next/link"

export default function Footer() {
  return (
    <div className="p-5 flex gap-x-10 justify-end">
      <Link href="/privacy" className="underline">Privacy Policy</Link>
      <Link href="/tos" className="underline">Terms Of Service</Link>
    </div>
  )
}
