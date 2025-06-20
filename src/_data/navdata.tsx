import { Home, Inbox, LogOut, PhoneIcon } from "lucide-react";

// export const navItems = {
//  mainNav: [
//   {
//     title: "Main",
//     url: "#",
//     items: [
//       {
//         title: "Dashboard",
//         url: "#",
//         icon: Home,
//       },
//       {
//         title: "Upload Sermon",
//         url: "#",
//         icon: Inbox,
//       },
//     ],
//   },
//  ],
//  sermonNav: [
//   {
//     title: "Sermon Management",
//     url: "#",
//     items: [
//       {
//         title: "My Sermon",
//         url: "#",
//         icon: Home,
//       },
//       {
//         title: "Series",
//         url: "#",
//         icon: Inbox,
//       },
//     ],
//   },
//  ],
//  engagementNav: [
//   {
//     title: "Engagement & Analytics",
//     url: "#",
//     items: [
//       {
//         title: "Sermon Analytics",
//         url: "#",
//         icon: Home,
//       },
//       {
//         title: "Comments & Feedback",
//         url: "#",
//         icon: Inbox,
//       },
//     ],
//   },
//  ];
// };

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

export const navItems = {
  mainNav: navMainItems,
  sermonNav: navSermonItems,
  engagementNav: navDataItems,
}

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
