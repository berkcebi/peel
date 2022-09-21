import React, { createContext } from "react";
import { Action } from "./reducer";

// Dispatch is defined when provider is created.
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const Context = createContext<React.Dispatch<Action>>(undefined!);
