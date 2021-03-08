import Link from "next/link";
import { Logo } from "../logo";

export const Header = () => {
  return (
    <div className="flex bg-gray-700 text-white justify-between items-center px-3">
      <Link href="/mcms-admin">
        <a className="py-3">
          <div className="flex space-x-2 items-center">
            <div>
              <Logo width={35} height={15} />
            </div>
            <span>MCMS</span>
          </div>
        </a>
      </Link>
      <div>Admin</div>
    </div>
  );
};
