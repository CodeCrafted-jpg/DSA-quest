"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function AttemptAssignmentPage() {
  const params = useParams();
  const id = params?.id as string;
  const [assignment, setAssignment] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/assignments/${id}`);
      const data = await res.json();
      if (data?.assignment) setAssignment(data.assignment);
    }
    load();
  }, [id]);

  function select(qid: string, idx: number) {
    setAnswers((s) => ({ ...s, [qid]: idx }));
  }

  async function submit() {
    setSubmitting(true);
    const payload = { answers: Object.entries(answers).map(([questionId, selectedIndex]) => ({ questionId, selectedIndex })) };
    const res = await fetch(`/api/assignments/${id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    setSubmitting(false);
    if (data?.success) {
      alert(`Submitted. Score: ${data.score}`);
      router.push('/dashboard');
    } else {
      alert("Submission failed");
    }
  }

  if (!assignment) return <div className="p-6">Loading assignment...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{assignment.title}</h2>
      <div className="space-y-6">
        {assignment.questions.map((q: any) => (
          <div key={q._id} className="p-4 border rounded">
            <p className="font-semibold">{q.text}</p>
            <div className="mt-2 flex flex-col gap-2">
              {q.options.map((opt: string, i: number) => (
                <label key={i} className="flex items-center gap-2">
                  <input type="radio" name={q._id} checked={answers[q._id] === i} onChange={() => select(q._id, i)} />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="bg-emerald-500 text-white px-4 py-2 rounded" onClick={submit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Assignment"}
        </button>
      </div>
    </div>
  );
}
