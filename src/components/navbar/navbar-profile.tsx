import { getServerUser } from "@/libs/supabase/function";
import ButtonPopupProfile from "./button-popup-profile";

const NavbarProfile = async () => {
  const user = await getServerUser();
  return (
    <nav className="flex lg:hidden items-center justify-between">
      <h1 className="text-xl font-bold mt-2 ml-5">BM</h1>
      <ButtonPopupProfile user={user} />
    </nav>
  );
};

export default NavbarProfile;
