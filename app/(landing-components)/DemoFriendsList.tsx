import { MdOutlineManageAccounts } from "react-icons/md";

export default function DemoFriendsList() {
  return (
    <div className="text-[#242129] flex gap-y-2  flex-col">

      <div className="flex justify-between text-3xl">
        <h1 className="font-bold">Friends</h1>
        <MdOutlineManageAccounts />
      </div>

      <div >
        <p className="font-semibold text-xl">Giang Tran</p>
        <p className="italic">🔒 polisci essay</p>
      </div>

      <div >
        <p className="font-semibold text-xl">Miu Noguchi</p>
        <p className="italic">🔒 physics study :(</p>
      </div>

      <div >
        <p className="font-semibold text-xl">Joseph Huynh</p>
        <p className="italic">🔒 meal prep</p>
      </div>

      <div >
        <p className="font-semibold text-xl">KentyBear</p>
        <p className="italic text-neutral-400">Unlocked</p>
      </div>
      <div >
        <p className="font-semibold text-xl">Ryan</p>
        <p className="italic text-neutral-400">Unlocked</p>
      </div>
    </div>
  )
}
