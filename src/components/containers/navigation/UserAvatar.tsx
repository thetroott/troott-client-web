import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { IoIosArrowDown } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

const UserAvatar = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="flex cursor-pointer justify-center items-center pt-1.5">
            <AvatarImage
              src="https://github.com/shadcn.png"
              width={24}
              height={24}
              className="rounded-lg  h-5 w-5 "
            />
            <AvatarFallback className="text-xs">CN</AvatarFallback>
            <IoIosArrowDown className="h-5 w-5"/>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <FaUser />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IoSettings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            {" "}
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAvatar;
