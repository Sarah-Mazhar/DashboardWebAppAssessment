"use client";

import { Provider } from "react-redux";
import { store } from "@/store";

/*
Wraps the application with Redux provider.
This ensures global state access across all pages.
*/

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
