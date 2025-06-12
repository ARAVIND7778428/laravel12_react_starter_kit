import { Head, Link, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { ChangeEvent } from 'react';

interface Blog {
    id: number;
    title: string;
    description: string;
    banner_image: string;
}

interface Props {
    blog: Blog;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Blog', href: '/blog' },
    { title: 'Edit', href: '#' },
];

export default function Edit({ blog }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: blog.title,
        description: blog.description,
        banner_image: null as File | null,
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('banner_image', file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post(route('blog.update', blog.id), {
            _method: 'patch',
            ...data,
        }, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Blog" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">✏️ Update Blog</h2>
                    <Link
                        href={route('blog.index')}
                        className="px-4 py-2 bg-gray-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
                    >
                        ← Back to Blogs
                    </Link>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                       
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                                placeholder="Enter title"
                            />
                            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                        </div>

                      
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                            <textarea
                                id="description"
                                rows={4}
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                                placeholder="Enter description"
                            ></textarea>
                            {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                        </div>

                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Current Banner Image:</label>
                            <img
                                src={`/storage/${blog.banner_image}`}
                                alt="Banner"
                                className="w-full h-48 object-cover rounded-lg shadow-md"
                            />
                        </div>

                       
                        <div className="mb-4">
                            <label htmlFor="banner_image" className="block text-sm font-medium text-gray-700">
                                Upload New Banner Image:
                            </label>
                            <input
                                type="file"
                                id="banner_image"
                                onChange={handleFileChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                            />
                            {errors.banner_image && <div className="text-red-500 text-sm mt-1">{errors.banner_image}</div>}
                        </div>

                      
                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
                            >
                                ✅ Update Blog
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
