import fetch from "node-fetch";

async function run() {
  try {
    const base = "http://localhost:3000";

    console.log("GET /api/assignments");
    const list = await fetch(base + "/api/assignments").then((r) => r.json());
    console.log("->", list?.assignments?.length || 0, "assignments");

    if (list?.assignments?.length) {
      const id = list.assignments[0]._id;
      console.log("GET /api/assignments/" + id);
      const detail = await fetch(base + "/api/assignments/" + id).then((r) => r.json());
      console.log("->", detail?.assignment?.title);
    }

    console.log("Test script finished. Ensure dev server is running at http://localhost:3000");
  } catch (e) {
    console.error("Error running tests:", e);
    process.exit(1);
  }
}

run();
