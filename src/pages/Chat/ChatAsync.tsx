import { lazy } from "react";

export const ChatAsync = lazy(() =>
  import(/* webpackChunkName: "Chat" */ "./Chat").then((module) => ({
    default: module.Chat,
  }))
);
