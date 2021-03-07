import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex ">
        <Link href="/mcms-admin">
          <a className="p-3 bg-indigo-200">
            <span>Administrator</span>
          </a>
        </Link>
      </div>
    </div>
  );
}
