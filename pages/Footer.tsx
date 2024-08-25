import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Footer = () => {
  const router = useRouter();
  const user = useSelector((x: any) => x.TaskReducer.user);
  const userFromQuery = router.query.user?.toString() || "";

  return (
    // user ?
    <div className="fixed bottom-0 w-full flex justify-center items-center space-x-28 py-2 bg-slate-800">
    <Link href={"/point"}>
      <Image
        width={24}
        height={24}
        className="w-6 h-6"
        src={
          router.pathname === "/point" ? "/imgs/home2.png" : "/imgs/home1.png"
        }
        alt="dl"
      />
    </Link>
    <Link href={"/tasks"}>
      <Image
        width={24}
        height={24}
        className="w-6 h-6"
        src={
          router.pathname === "/tasks" ? "/imgs/task2.png" : "/imgs/task1.png"
        }
        alt="q"
      />
    </Link>
    <Link href={"/friend"}>
      <Image
        width={24}
        height={24}
        className="w-6 h-6"
        src={
          router.pathname === "/friend" ? "/imgs/user2.png" : "/imgs/user1.png"
        }
        alt="user"
      />
    </Link>
  </div>
      // : null
  )
}

export default Footer