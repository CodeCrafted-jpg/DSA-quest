"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/assignments");
      const data = await res.json();
      if (data?.assignments) setAssignments(data.assignments);
    }
    load();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assignments</h2>
      <div className="space-y-4">
        {assignments.map((a) => (
          <div key={a._id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{a.title}</h3>
              <p className="text-sm text-gray-600">{a.description}</p>
            </div>
            <Link href={`/dashboard/assignments/${a._id}`} className="bg-emerald-500 text-white px-3 py-2 rounded">
              Attempt
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
