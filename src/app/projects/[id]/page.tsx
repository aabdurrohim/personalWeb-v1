"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaFolder, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import { useParams } from "next/navigation"; // Import useParams
import { BlinkBlur } from "react-loading-indicators";

interface Project {
  id: number;
  title: string;
  image?: string;
  categories: string;
  description: string;
}

export default function ProjectDetail() {
  // Renamed to ProjectDetail
  const { id } = useParams<{ id: string }>(); // Get ID from URL
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          throw new Error("Project ID is missing.");
        }

        const numericId = parseInt(id, 10); // Convert id to a number
        if (isNaN(numericId)) {
          throw new Error("Invalid project ID. ID must be a number.");
        }

        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        if (!apiKey) {
          throw new Error("API key is missing");
        }

        const res = await fetch(`${apiBaseUrl}/project/${numericId}`, {
          // Use ID in URL
          headers: {
            "X-API-KEY": apiKey,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorData?.message || res.statusText}`);
        }

        const dataProject: Project = await res.json();
        setProject(dataProject);
      } catch (err: any) {
        console.error("Error fetching project:", err);
        setError(err?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Add 'id' to dependency array

  if (loading)
    return (
      <p className="flex flex-col items-center justify-center text-center mt-8">
        <BlinkBlur color="#000000" size="small" text="" textColor="" />
        Loading...
      </p>
    );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <FaExclamationTriangle className="text-red-500 text-4xl mb-2" />
        <p className="text-red-500 text-lg font-semibold">{error}</p>
        <Link href="/Project" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          {" "}
          {/* Corrected link */}
          <FaArrowLeft className="inline-block mr-2" /> Back to Projects
        </Link>
      </div>
    );
  }

  if (!project) return <p className="text-center">Project not found</p>; // Handle null project

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-8 flex-grow">
        {" "}
        {/* Content area */}
        <section className="bg-white rounded-xl w-full">
          {" "}
          {/* Pastikan section memenuhi lebar parent */}
          <div className="p-6">
            {" "}
            {/* Tambahkan padding di dalam section */}
            <h2 className="text-lg">
              <Link href="/projects" className="flex items-center gap-2 text-gray-700 hover:underline">
                <FaArrowLeft />
                Back
              </Link>
            </h2>
            <div className="mt-4">
              {" "}
              {/* Spasi antara back link dan judul */}
              <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
              <p className="mt-2">{project.description}</p>
              <p className="mt-2">Category: {project.categories}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
