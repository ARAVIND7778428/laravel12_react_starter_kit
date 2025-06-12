import { Head, Link, useForm } from "@inertiajs/react";
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from "@/types";
import { ArrowLeft, Pin, FileText, CalendarRange } from "lucide-react";

interface Blog {
    id: number;
    title: string;
    description: string;
    banner_image: string;
    created_at: string;
}

interface Props {
    blog: Blog;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashbaord' },
    { title: 'Blog', href: '/blog' },
    { title: 'Details', href: '#' },
];

export default function Show({ blog }: Props) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this blog?')) {
            destroy(route('blog.destroy', blog.id));
        }
    };

    return (
        <AppLayout>
            <Head title="Blog Details" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">📖 Blog</h2>
                    <Link
                        href={route('blog.index')}
                        className="px-4 py-2 bg-gray-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-gray-gray-700 transition"
                    >
                        <ArrowLeft size={16} />
                        Back to Blogs
                    </Link>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
                    <div className="mb-6">
                        <img 
                            src={`/storage/${blog.banner_image}`} 
                            alt="Banner image" 
                            className="w-full h-60 object-cover rounded-lg shadow-md"
                        />
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700"><Pin size={16}/> Title:</h3>
                        <p className="text-gray-900 bg-gray-100 p-3 rounded-lg shadow-sm">{ blog.title }</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700"><FileText size={16} /> Description:</h3>
                        <p className="text-gray-900 bg-gray-100 p-3 rounded-lg shadow-sm">{ blog.description }</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700"><CalendarRange size={16} /> Created At:</h3>
                        <p className="text-gray-900 bg-gray-100 p-3 rounded-lg shadow-sm">
                            {new Date (blog.created_at).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </p>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <Link
                            href={route('blog.edit', blog.id)}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                        >
                            ✏️ Edit Blog
                        </Link>
                        <button
                            onClick={handleDelete}
                            disabled={processing}
                            type="button"
                            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
                        >
                            🗑 Delete
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}