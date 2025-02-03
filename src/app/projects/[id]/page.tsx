"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "next/navigation";
import { BlinkBlur } from "react-loading-indicators";
import { AlertCircle, Tag, FileText, Clock } from "lucide-react";

interface Project {
  id: number;
  title: string;
  image?: string;
  categories: string;
  description: string;
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
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

        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
          throw new Error("Invalid project ID. ID must be a number.");
        }

        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        if (!apiKey) {
          throw new Error("API key is missing");
        }

        const res = await fetch(`${apiBaseUrl}/project/${numericId}`, {
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
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <BlinkBlur color="#000000" size="small" text="" textColor="" />
        <p className="mt-4 text-gray-500">Loading project details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
        <AlertCircle className="w-8 h-8 text-red-500 mb-4" />
        <p className="text-gray-800 text-lg mb-6">{error}</p>
        <Link href="/projects" className="group flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition duration-200">
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-gray-600 mb-4">Project not found</p>
        <Link href="/projects" className="text-gray-600 hover:bg-gray-100 px-3 py-1 rounded transition-colors duration-200">
          Return to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Notion-style navigation */}
        <nav className="mb-8">
          <Link href="/projects" className="inline-flex items-center text-gray-600 hover:bg-gray-100 px-2 py-1 rounded transition-colors duration-200">
            <FaArrowLeft className="mr-2 w-3 h-3" />
            <span className="text-sm">Back to Projects</span>
          </Link>
        </nav>

        {/* Notion-style content */}
        <article className="space-y-8">
          {/* Title section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 hover:bg-gray-100 inline-block px-1 rounded cursor-text">{project.title}</h1>

            {/* Categories */}
            {project.categories && (
              <div className="flex flex-wrap gap-1 px-1">
                {project.categories.split(",").map((category, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-0.5 text-xs text-gray-500 bg-gray-100 rounded">
                    {category.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description section */}
          <div className="hover:bg-gray-100 p-3 rounded-lg transition-colors duration-200">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-gray-400 mt-1" />
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">Description</div>
                <p className="text-gray-700 whitespace-pre-wrap">{project.description}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
