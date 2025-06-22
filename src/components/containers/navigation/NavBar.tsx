import { BellIcon, HelpCircleIcon } from "lucide-react";
import TopNav from "./TopNav";
import Trigger from "./Trigger";
import UserAvatar from "./UserAvatar";


const NavBar = () => {
  return (
    <nav className="flex items-center justify-between p-4 h-14 w-full ">
      <div className="flex items-center" >

      {/* LEFT */}
      <div className="flex items-center">
      <Trigger />
      <TopNav />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <BellIcon className="h-5 w-5" />
        <HelpCircleIcon className="h-5 w-5" />
        <UserAvatar />
      </div>
      </div>
    </nav>
  );
};

export default NavBar;
