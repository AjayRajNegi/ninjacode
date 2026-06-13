import type { KeyBinding } from "@opentui/core";
import { EmptyBorder } from "./border";
import { StatusBar } from "./status-bar";
import { createCliRenderer, TextareaRenderable } from "@opentui/core";

type Props = {
  onSubmit: (text: string) => void;
  disabled?: boolean;
};

export function Input({ onSubmit, disabled = false }: Props) {
  return (
    <box width="100%" alignItems="center">
      <box customBorderChars={{ ...EmptyBorder, vertical: "┃" }}>
        <box
          position="relative"
          justifyContent="center"
          paddingX={2}
          paddingY={1}
          backgroundColor="#1A1A24"
          width="100%"
          gap={1}
        >
          <textarea
            focused={!disabled}
            keyBindings={[
              { name: "return", shift: true, action: "newline" },
              { name: "enter", ctrl: true, action: "submit" },
            ]}
            placeholder={`Ask anything... "Fix a bug in the database"`}
          />

          <StatusBar />
        </box>
      </box>
    </box>
  );
}
