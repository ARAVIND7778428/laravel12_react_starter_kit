import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Plus } from "lucide-react";

interface Blog {
    id: number;
    title: string;
    description: string;
    created_at: string;
}

interface Props {
    blogs: {
        data: Blog[];
        next_page_url: string | null;
        prev_page_url: string | null;
        links: {
            url: string | null;
            label: string;
            activate: boolean;
        } [];
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashbaord' },
    { title: 'Blog', href: '/blog' },
];

export default function BlogIndex({ blogs }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog Posts" />

            <div className="container mx-auto px-4 mt-5">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">📜 Blog Posts</h2>
                    <Link
                        href="/blog/create"
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transit"
                    >
                       ➕ Create New Blog 
                    </Link>
                </div>

                <div className="bg-white shadow-lg rouded-g overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                            <tr>
                                <th className="px-4 py-3 text-left">ID</th>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-left">Created At</th>
                                <th className="px-4 py-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            { blogs.data.map((blog) => (
                                <tr key={blog.id} className="hover:bg-gray-100 transition">
                                    <td className="px-4 py-3">{blog.id}</td>
                                    <td className="px-4 py-3 font-semibold text-gray-900">{blog.title}</td>
                                    <td className="px-4 py-3 text-gray-700">
                                        {blog.description.length > 50
                                        ? blog.description.slice(0, 50) + '...'
                                        : blog.description }
                                    </td>
                                    <td className="px-4 py-3 text-gray-600">
                                        {new Date(blog.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 flex justify-center space-x-2">
                                        <Link
                                            href={`/blog/${blog.id}`}
                                            className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded shadow-md hover:bg-blue-600 transition"
                                        >
                                            👁 View
                                        </Link>
                                        <Link
                                            href={`/blog/${blog.id}/edit`}
                                            className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded shadow-md hover:bg-yellow-600 transition"
                                        >
                                            ✏️ Edit
                                        </Link>
                                        <button
                                            onClick={ () => {
                                                if (confirm('Are you sure you want to delete this blog?')) {
                                                    router.delete(`/blog/${blog.id}`);
                                                }
                                            }}
                                            className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded shadow-md hover:bg-red-600 transition"
                                        >
                                            🗑 Delete
                                        </button>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-center gap-2">
                    {blogs.links.map((link, index) => 
                        link.url ? (
                            <button
                                key={index}
                                className={`px-3 py-1 rounded ${
                                    link.activate
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                onClick={ () => router.visit(link.url!)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : null
                    )}
                </div>

            </div>
        </AppLayout>
    );
}