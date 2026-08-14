"use client";

import React, { useEffect, useState } from "react";

export default function TeacherAssignmentsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/assignments");
      const data = await res.json();
      if (data && data.assignments) setAssignments(data.assignments);
    }
    load();
  }, []);

  async function createAssignment(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, published: true }),
    });
    const data = await res.json();
    if (data?.success) {
      setTitle("");
      setDescription("");
      setAssignments((s) => [{ _id: data.assignmentId, title, description }, ...s]);
    }
    setLoading(false);
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Teacher Assignments</h2>

      <form onSubmit={createAssignment} className="mb-6 space-y-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="p-2 border rounded w-full" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="p-2 border rounded w-full" />
        <button className="bg-emerald-500 text-white px-4 py-2 rounded" disabled={loading || !title}>
          {loading ? "Creating..." : "Create & Publish"}
        </button>
      </form>

      <div className="space-y-3">
        {assignments.map((a) => (
          <div key={a._id} className="p-4 border rounded">
            <h3 className="font-bold">{a.title}</h3>
            <p className="text-sm text-gray-600">{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
