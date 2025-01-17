import { fetchAuthUserAction } from "@/actions";
import { redirect } from "next/navigation";
import { Logout } from "@/components/log-out";

export default async function Home() {
  const currentUser= await fetchAuthUserAction()
  if(!currentUser.success) redirect('/sign-in')
  return (
    <div>
      <h1>Next JS Authentication</h1>
      <h2>{currentUser?.data?.userName}</h2>
      <p>{currentUser?.data?.email}</p>
      <Logout />
    </div>
  );
}

