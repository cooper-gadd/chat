import {
  ActivityIcon,
  BandageIcon,
  ChefHatIcon,
  CodeIcon,
  LucideProps,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface Suggestion {
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  options: string[];
}

export const suggestions: Suggestion[] = [
  {
    title: "Engineering",
    icon: CodeIcon,
    options: [
      "How to center a div",
      "Why does Rust look so strange",
      "Can I uninstall Node and just use Bun",
      "What is TanStack Start",
    ],
  },
  {
    title: "Cooking",
    icon: ChefHatIcon,
    options: [
      "Ice and water soup recipe",
      "How to make Monkey Bar mac and cheese",
      "Can I drink blue milk",
      "Are mangos good in smoothies",
    ],
  },
  {
    title: "Fitness",
    icon: ActivityIcon,
    options: [
      "Can I get abs in a week",
      "How to wake up early to workout",
      "Will I die from running a marathon",
      "Is the sauna and cold plunge worth it",
    ],
  },
  {
    title: "Healthcare",
    icon: BandageIcon,
    options: [
      "How many apples a day to keep the doctor away",
      "Can I heal my broken arm without a cast",
      "Is it possible to drink a gallon of milk",
      "Why does my heart skip a beat sometimes",
    ],
  },
];
