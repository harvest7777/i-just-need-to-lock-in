import ManageProfile from "./_components/ManageProfile"
import ManageColors from "./_components/ManageColors"

export default function Profile() {
  return (
    <div className="flex flex-col justify-center items-center w-full space-y-5">
      <ManageProfile />
      <ManageColors />
    </div>
  )
}
