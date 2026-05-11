import { execSync, spawn } from "node:child_process";

const port = 3000;

function getPortPids(targetPort) {
  try {
    const output = execSync(`lsof -tiTCP:${targetPort} -sTCP:LISTEN`, {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();

    return output ? output.split("\n").filter(Boolean) : [];
  } catch {
    return [];
  }
}

for (const pid of getPortPids(port)) {
  try {
    process.kill(Number(pid), "SIGKILL");
    console.log(`Stopped existing process on port ${port} (PID ${pid})`);
  } catch (error) {
    console.warn(`Could not stop PID ${pid}:`, error);
  }
}

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const child = spawn(npmCommand, ["run", "dev", "--workspace", "frontend"], {
  stdio: "inherit",
});

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
