"use client";

import {
  ActivityIcon,
  BandageIcon,
  ChefHatIcon,
  CodeIcon,
  LucideProps,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import { Button } from "@/components/ui/button";

interface Suggestion {
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  options: string[];
}

const suggestions: Suggestion[] = [
  {
    title: "Engineering",
    icon: CodeIcon,
    options: [
      "How to center a div",
      "Why is Rust so hard to learn",
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

export default function Page() {
  const [selected, setSelected] = useState<string>(suggestions[0].title);

  const suggestionOptions = suggestions.find(
    (suggestion) => selected === suggestion.title,
  )?.options;

  return (
    <main className="flex items-center justify-center p-6 md:p-10 w-full">
      <div className="gap-4 flex flex-col">
        <h1 className="scroll-m-20 text-balance text-4xl font-extrabold tracking-tight">
          How can I help today?
        </h1>
        <div className="flex gap-2">
          {suggestions.map((suggestion) => (
            <Button
              className="rounded-full"
              variant={selected === suggestion.title ? "default" : "outline"}
              onClick={() => setSelected(suggestion.title)}
              key={suggestion.title}
            >
              <suggestion.icon />
              {suggestion.title}
            </Button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {suggestionOptions!.map((option) => (
            <p
              key={option}
              className="border-secondary/40 flex items-start gap-2 border-t py-1 first:border-none"
            >
              {option}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
