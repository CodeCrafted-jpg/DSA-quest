
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ModuleView from "@/components/challenges/ModuleView";

export default function ModulePage() {
    const { topicId, moduleId } = useParams();
    const router = useRouter();
    const [module, setModule] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchModule() {
            try {
                const res = await fetch(`/api/topics/${topicId}`);
                const data = await res.json();

                if (data.topic && data.topic.modules) {
                    const foundModule = data.topic.modules.find((m: any) => m.id === moduleId || m._id === moduleId);
                    setModule(foundModule);
                }
            } catch (error) {
                console.error("Failed to fetch module:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchModule();
    }, [topicId, moduleId]);

    const handleComplete = async () => {
        try {
            const res = await fetch("/api/progress/complete-module", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topicId, moduleId }),
            });

            const data = await res.json();
            if (data.success) {
                // Option: Show success toast or just redirect
                setTimeout(() => {
                    router.push(`/challenges/${topicId}`);
                }, 1500);
            }
        } catch (error) {
            console.error("Failed to complete module:", error);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading module...</div>;
    if (!module) return <div className="min-h-screen flex items-center justify-center">Module not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <ModuleView
                module={module}
                onComplete={handleComplete}
                onBack={() => router.push(`/challenges/${topicId}`)}
            />
        </div>
    );
}
