import { ArrowUpIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "./ui/input-group";

export function ChatInput() {
  return (
    <InputGroup className="max-w-3xl">
      <InputGroupTextarea placeholder="Ask anything" autoFocus />
      <InputGroupAddon align="block-end">
        <InputGroupButton
          variant="default"
          className="rounded-full ml-auto"
          size="icon-xs"
          disabled
        >
          <ArrowUpIcon />
          <span className="sr-only">Send</span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
