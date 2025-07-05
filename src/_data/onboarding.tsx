import { DotIcon } from "lucide-react"

const OnboardingItems = [
  {
    id: "1",
    icon: DotIcon,
    title: "Verify your account",
    text: "Add the required information to verify your account and avoid any interruptions to your access or sermon publishing.",
    button: "Verify account",
    action: "/get-started/verify-account",
  },
  {
    id: "2",
    icon: DotIcon,
    title: "Complete your profile",
    text: "Fill out your ministry information and upload a profile photo to help your audience connect with you.",
    button: "Complete profile",
    action: "/get-started/complete-profile",
  },
  {
    id: "3",
    icon: DotIcon,
    title: "How to use troott",
    text: "Take a guided tour of the dashboard using Troott. It helps you discover important tools and how to use them effectively.",
    button: "Tour & Tutorial",
    action: "/get-started/tour-guide",
  },
  {
    id: "4",
    icon: DotIcon,
    title: "Upload first sermon",
    text: "Create your first sermon post with title, description, and upload your audio or video content.",
    button: "Upload sermon",
    action: "/upload-sermon",
  },
]


export default OnboardingItems