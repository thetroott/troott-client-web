import { Home, Inbox, LogOut, PhoneIcon } from "lucide-react";

export const navItems = {
 mainNav: [
  {
    title: "Main",
    url: "#",
    roles: ["staff", "preacher"],
    items: [
      {
        title: "Dashboard",
        url: "#",
        icon: Home,
        isActive: true,
      },
      {
        title: "Upload Sermon",
        url: "upload-sermon",
        icon: Inbox,
      },
    ],
  },
 ],
 sermonNav: [
  {
    title: "Sermon Management",
    roles: ["staff", "preacher"],
    url: "#",
    items: [
      {
        title: "My Sermon",
        url: "get-sermons",
        icon: Home,
      },
      {
        title: "Series",
        url: "#",
        icon: Inbox,
      },
    ],
  },
 ],
 engagementNav: [
  {
    title: "Engagement & Analytics",
    url: "#",
    roles: ["staff", "preacher"],
    items: [
      {
        title: "Sermon Analytics",
        url: "#",
        icon: Home,
      },
      {
        title: "Comments & Feedback",
        url: "#",
        icon: Inbox,
      },
    ],
  },
 ]
};




export const navMainItems = {
  title: "Main",
  url: "#",
  items: [
    {
      title: "Dashboard",
      url: "#",
      icon: Home,
    },
    {
      title: "Upload Sermon",
      url: "#",
      icon: Inbox,
    },
  ],
};

export const navSermonItems = {
  title: "Sermon Management",
  url: "#",
  items: [
    {
      title: "My Sermon",
      url: "#",
      icon: Home,
    },
    {
      title: "Series",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Series",
      url: "#",
      icon: Inbox,
    },
  ],
};

export const navDataItems = {
  title: "Engagement & Analytics",
  url: "#",
  items: [
    {
      title: "Sermon Analytics",
      url: "#",
      icon: Home,
    },
    {
      title: "Comments & Feedback",
      url: "#",
      icon: Inbox,
    },
  ],
};


export const navFooterItems = [
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
  {
    title: "Install Troott on",
    url: "#",
    icon: PhoneIcon,
  },
];
