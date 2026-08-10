import { Extension } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import type { GetReferenceClientRect, Instance } from "tippy.js";

import {
  SlashCommandMenu,
  type SlashCommandMenuProps,
} from "../components/slash-command-menu";
import { getAvailableSlashCommands } from "../registry/slash-command-registry";
import type {
  SlashCommandItem,
  SlashCommandMenuHandle,
} from "../types/slash-command.types";
import { filterSlashCommands } from "../utils/filter-slash-commands";

const slashCommandPluginKey = new PluginKey("notesvault-slash-command");

export const SlashCommandExtension = Extension.create({
  name: "slashCommand",

  addProseMirrorPlugins() {
    return [
      Suggestion<SlashCommandItem>({
        editor: this.editor,
        pluginKey: slashCommandPluginKey,
        char: "/",
        allowSpaces: false,
        startOfLine: false,

        allow: ({ state, range }) => {
          const parentNode = state.doc.resolve(range.from).parent;

          return (
            parentNode.type.name === "paragraph" &&
            parentNode.textContent.startsWith("/")
          );
        },

        items: ({ query }) =>
          filterSlashCommands(getAvailableSlashCommands(), query).slice(0, 10),

        command: ({ editor, range, props }) => {
          props.execute({
            editor,
            range,
          });
        },

        render: () => {
          let component: ReactRenderer<
            SlashCommandMenuHandle,
            SlashCommandMenuProps
          > | null = null;

          let popup: Instance | null = null;
          let sessionId = 0;

          return {
            onStart: (props) => {
              const currentSessionId = ++sessionId;

              component = new ReactRenderer<
                SlashCommandMenuHandle,
                SlashCommandMenuProps
              >(SlashCommandMenu, {
                editor: props.editor,
                props: {
                  items: props.items,
                  onSelect: (item: SlashCommandItem) => {
                    props.command(item);
                  },
                },
              });

              if (!props.clientRect) {
                return;
              }

              const referenceClientRect =
                props.clientRect as GetReferenceClientRect;

              void import("tippy.js").then(({ default: tippy }) => {
                if (
                  currentSessionId !== sessionId ||
                  !component ||
                  popup
                ) {
                  return;
                }

                popup = tippy(document.body, {
                  getReferenceClientRect: referenceClientRect,
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: "manual",
                  placement: "bottom-start",
                  maxWidth: "none",
                });
              });
            },

            onUpdate: (props) => {
              component?.updateProps({
                items: props.items,
                onSelect: (item: SlashCommandItem) => {
                  props.command(item);
                },
              });

              if (!props.clientRect) {
                return;
              }

              popup?.setProps({
                getReferenceClientRect:
                  props.clientRect as GetReferenceClientRect,
              });
            },

            onKeyDown: (props) => {
              if (props.event.key === "Escape") {
                popup?.hide();
                return true;
              }

              return component?.ref?.onKeyDown(props.event) ?? false;
            },

            onExit: () => {
              sessionId += 1;

              popup?.destroy();
              component?.destroy();

              popup = null;
              component = null;
            },
          };
        },
      }),
    ];
  },
});
