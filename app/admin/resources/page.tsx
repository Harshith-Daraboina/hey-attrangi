"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  type: string;
  category?: string;
  published: boolean;
  featured: boolean;
  views: number;
  createdAt: string;
}

export default function AdminResources() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/admin/login");
      return;
    }
    fetchResources();
  }, [session, status, router]);

  const fetchResources = async () => {
    try {
      const response = await fetch("/api/resources");
      if (response.ok) {
        const data = await response.json();
        setResources(data);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteResource = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    
    try {
      const response = await fetch(`/api/resources/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        setResources(resources.filter(resource => resource.id !== id));
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  const togglePublished = async (id: string, published: boolean) => {
    try {
      const response = await fetch(`/api/resources/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ published: !published }),
      });
      
      if (response.ok) {
        setResources(resources.map(resource => 
          resource.id === id ? { ...resource, published: !published } : resource
        ));
      }
    } catch (error) {
      console.error("Error updating resource:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Resources</h1>
              <p className="text-gray-600 mt-1">Create, edit, and manage mental health resources</p>
            </div>
            <Link
              href="/admin/resources/new"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Create New Resource
            </Link>
          </div>
        </div>
      </div>

      {/* Resources List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {resources.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first resource.</p>
            <Link
              href="/admin/resources/new"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Create First Resource
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thumbnail
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resource
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resources.map((resource) => (
                    <tr key={resource.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {resource.thumbnail ? (
                          <img 
                            src={resource.thumbnail} 
                            alt={resource.title}
                            className="h-12 w-12 rounded-lg object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-lg">
                              {resource.type === 'video' ? '🎥' :
                               resource.type === 'link' ? '🔗' :
                               resource.type === 'document' ? '📄' :
                               resource.type === 'reference' ? '📚' : '📋'}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {resource.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {resource.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          resource.type === 'video' ? 'bg-red-100 text-red-800' :
                          resource.type === 'link' ? 'bg-blue-100 text-blue-800' :
                          resource.type === 'document' ? 'bg-green-100 text-green-800' :
                          resource.type === 'reference' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {resource.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {resource.category || 'Uncategorized'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => togglePublished(resource.id, resource.published)}
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              resource.published 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {resource.published ? 'Published' : 'Draft'}
                          </button>
                          {resource.featured && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {resource.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(resource.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/admin/resources/${resource.id}`}
                            className="text-orange-600 hover:text-orange-900"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteResource(resource.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
