import ProjectIcon from "@/assets/icons/project.svg";
import EpicsIcon from "@/assets/icons/epics.svg";
import TaskIcon from "@/assets/icons/task.svg";
import MemberIcon from "@/assets/icons/members.svg";
import DetailsIcon from "@/assets/icons/details.svg";

export const sidebarLinks = [
  {
    label: "Projects",
    href: "/project",
    icon: ProjectIcon,
  },
  {
    label: "Project Epics",
    href: "/project/epics",
    icon: EpicsIcon,
  },
  {
    label: "Project Tasks",
    href: "/project/tasks",
    icon: TaskIcon,
  },
  {
    label: "Project Members",
    href: "/project/members",
    icon: MemberIcon,
  },
  {
    label: "Project Details",
    href: "/project/details",
    icon: DetailsIcon,
  },
];
