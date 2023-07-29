import { useAuth, useUser } from "@/context/authCtx";
import Link from "next/link";

export function Header() {
  const { logout } = useAuth();
  const { username } = useUser();

  return (
    <header className="flex items-center justify-between p-4 text-black align-middle bg-green-500">
      <h1 className="text-4xl font-semibold">Cookie Stand Admin</h1>

      <p className="text-lg font-semibold text-gray-700">
        Hi, {username} {"  "}
        <button
          onClick={logout}
          className="px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-800 "
        >
          Logout
        </button>
      </p>
    </header>
  );
}
