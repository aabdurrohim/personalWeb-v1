"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BlinkBlur } from "react-loading-indicators";
import { FaFolder, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  image?: string;
  categories: string;
  description: string;
}

export default function Project() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY; // From environment variable
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!apiKey) {
          throw new Error("API key is missing");
        }

        const res = await fetch(`${apiBaseUrl}/project`, {
          headers: {
            "X-API-KEY": apiKey,
          },
        });

        if (!res.ok) {
          const errorData = await res.json(); // Try to get error details from the server
          throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorData?.message || res.statusText}`);
        }

        const json = await res.json();
        setProjects(json.projects || []); // Handle the case where projects might be undefined or null

        if (json.projects && json.projects.length === 0) {
          setError("No projects found yet."); // Set a more user-friendly message
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err?.message || "An error occurred"); // Provide a default error message
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <p className="flex flex-col items-center justify-center text-center mt-8">
        <BlinkBlur color="#000000" size="small" text="" textColor="" />
        Loading...
      </p>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <FaExclamationTriangle className="text-red-500 text-4xl mb-2" />
        <p className="text-red-500 text-lg font-semibold">{error}</p>
        <Link href="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          <FaArrowLeft className="inline-block mr-2" /> Back to Home
        </Link>
      </div>
    );

  return (
    <section className="bg-white max-w-4xl mx-auto my-8">
      <h2 className="text-lg">
        <Link href="/" className="flex items-center gap-2 text-gray-700 hover:underline">
          <FaArrowLeft />
          Back
        </Link>
      </h2>

      <h1 className="text-2xl font-bold text-gray-900 mt-3">Projects</h1>
      <p className="text-gray-600 mt-2">Here are some of the projects I've worked on. Feel free to explore!</p>

      <div className="mt-4 space-y-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} className="flex items-center gap-2 bg-gray-100 p-4 rounded-lg border border-gray-300 hover:bg-gray-200 transition">
            <FaFolder className="text-yellow-500" />
            <span className="text-gray-900 font-medium">{project.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
