"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BlinkBlur } from "react-loading-indicators";
import { FaArrowLeft } from "react-icons/fa";
import { AlertCircle, ChevronRight, File } from "lucide-react";

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
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
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
          const errorData = await res.json();
          throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorData?.message || res.statusText}`);
        }

        const json = await res.json();
        setProjects(json.projects || []);

        if (json.projects && json.projects.length === 0) {
          setError("No projects found yet.");
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <BlinkBlur color="#000000" size="small" text="" textColor="" />
        <p className="mt-4 text-gray-600 font-medium">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
        <div className="bg-red-50 rounded-full p-4 mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <p className="text-gray-800 text-lg font-medium mb-6">{error}</p>
        <Link href="/" className="group flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition duration-200">
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Notion-style navigation */}
        <nav className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:bg-gray-100 px-2 py-1 rounded transition-colors duration-200">
            <FaArrowLeft className="mr-2 w-3 h-3" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </nav>

        {/* Notion-style header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 hover:bg-gray-100 inline-block px-1 rounded cursor-text">My Projects</h1>
          <p className="text-gray-500 px-1">Here are some of the projects I've worked on. Feel free to explore!</p>
        </header>

        {/* Notion-style project list */}
        <div className="space-y-1">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="group block hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <div className="p-3 flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <File className="w-4 h-4 text-gray-400" />
                </div>
                <div className="ml-3 flex-grow min-w-0">
                  <div className="flex items-center">
                    <h2 className="text-base font-medium text-gray-900 truncate">{project.title}</h2>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{project.description}</p>
                  {project.categories && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.categories.split(",").map((category, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-0.5 text-xs text-gray-500 bg-gray-100 rounded">
                          {category.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
