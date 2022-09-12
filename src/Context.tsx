import React, { createContext } from "react";
import { Action } from "./reducer";

// Dispatch is defined when provider is created.
export const Context = createContext<React.Dispatch<Action>>(undefined!);
