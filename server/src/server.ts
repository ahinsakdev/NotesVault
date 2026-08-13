import type { Server } from "node:http";

import { createApp } from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { env } from "./config/env.js";

let httpServer: Server | null = null;
let isShuttingDown = false;

function listenForRequests(): Promise<Server> {
  const app = createApp();

  return new Promise((resolve, reject) => {
    const server = app.listen(env.PORT);

    function handleListening(): void {
      server.off("error", handleError);
      resolve(server);
    }

    function handleError(error: Error): void {
      server.off("listening", handleListening);
      reject(error);
    }

    server.once("listening", handleListening);
    server.once("error", handleError);
  });
}

async function closeHttpServer(): Promise<void> {
  if (!httpServer) {
    return;
  }

  const server = httpServer;
  httpServer = null;

  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

async function shutdown(reason: string): Promise<void> {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  console.log(`${reason} received. Shutting down NotesVault API...`);

  try {
    await closeHttpServer();
    await disconnectDatabase();

    console.log("NotesVault API shut down cleanly");
  } catch (error) {
    console.error("NotesVault API shutdown failed:", error);
    process.exitCode = 1;
  }
}

function handleFatalError(
  source: "uncaughtException" | "unhandledRejection",
  error: unknown,
): void {
  console.error(`Fatal ${source}:`, error);

  process.exitCode = 1;

  void shutdown(source).finally(() => {
    process.exit(1);
  });
}

async function startServer(): Promise<void> {
  try {
    await connectDatabase();

    httpServer = await listenForRequests();

    console.log(`NotesVault API listening on port ${env.PORT}`);
  } catch (error) {
    console.error("Failed to start NotesVault API:", error);

    process.exitCode = 1;

    try {
      await disconnectDatabase();
    } catch (disconnectError) {
      console.error(
        "Failed to disconnect MongoDB after startup failure:",
        disconnectError,
      );
    }
  }
}

process.once("SIGINT", () => {
  void shutdown("SIGINT").finally(() => {
    process.exit(process.exitCode ?? 0);
  });
});

process.once("SIGTERM", () => {
  void shutdown("SIGTERM").finally(() => {
    process.exit(process.exitCode ?? 0);
  });
});

process.once("uncaughtException", (error) => {
  handleFatalError("uncaughtException", error);
});

process.once("unhandledRejection", (reason) => {
  handleFatalError("unhandledRejection", reason);
});

void startServer();
