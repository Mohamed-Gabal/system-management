import ProjectIcon from "@/assets/icons/project.svg";
import EpicsIcon from "@/assets/icons/epics.svg";
import TaskIcon from "@/assets/icons/task.svg";
import MemberIcon from "@/assets/icons/members.svg";
import DetailsIcon from "@/assets/icons/details.svg";

export const sidebarLinks = [
  {
    label: "Projects",
    mobileLabel: "Projects",
    href: "/project",
    icon: ProjectIcon,
  },
  {
    label: "Project Epics",
    mobileLabel: "Epics",
    href: "/project/epics",
    icon: EpicsIcon,
  },
  {
    label: "Project Tasks",
    mobileLabel: "Tasks",
    href: "/project/tasks",
    icon: TaskIcon,
  },
  {
    label: "Project Members",
    mobileLabel: "Members",
    href: "/project/members",
    icon: MemberIcon,
  },
  {
    label: "Project Details",
    mobileLabel: "Details",
    href: "/project/details",
    icon: DetailsIcon,
  },
];
