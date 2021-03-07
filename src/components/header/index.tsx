import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex bg-gray-800 text-white justify-between items-center px-3">
      <Link href="/mcms-admin">
        <a className="py-3">
          <div className="flex space-x-2 items-center">
            <div>
              <img src="/logo.png" alt="Miniature cms logo" width={35} height={15} />
            </div>
            <span>MCMS</span>
          </div>
        </a>
      </Link>

      <div>Admin</div>
    </div>
  );
};
