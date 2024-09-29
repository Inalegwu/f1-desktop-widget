import type { inferAsyncReturnType } from "@trpc/server";
import { BrowserWindow } from "electron";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import axios from "axios";

export async function createContext() {
  const browserWindow = BrowserWindow.getFocusedWindow();

  const client = axios.create({
    baseURL: "http://localhost:3000/graphql",
  });

  return {
    window: browserWindow,
    client,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
