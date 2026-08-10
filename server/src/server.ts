import type { Server } from "node:http";

import { createApp } from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { env } from "./config/env.js";

let httpServer: Server | null = null;
let isShuttingDown = false;

async function shutdown(signal: NodeJS.Signals): Promise<void> {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  console.log(`${signal} received. Shutting down NotesVault API...`);

  if (httpServer) {
    await new Promise<void>((resolve, reject) => {
      httpServer?.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  await disconnectDatabase();

  console.log("NotesVault API shut down cleanly");
}

async function startServer(): Promise<void> {
  try {
    await connectDatabase();

    const app = createApp();

    httpServer = app.listen(env.PORT, () => {
      console.log(`NotesVault API running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start NotesVault API:", error);

    process.exitCode = 1;
  }
}

process.once("SIGINT", () => {
  void shutdown("SIGINT").finally(() => {
    process.exit();
  });
});

process.once("SIGTERM", () => {
  void shutdown("SIGTERM").finally(() => {
    process.exit();
  });
});

void startServer();
