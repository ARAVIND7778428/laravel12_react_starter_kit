import { Head, useForm, Link, router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Blog', href: '/blog' },
    { title: 'Create', href: '/blog/create' },
];

export default function CreateBlog() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        banner_image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        if(data.banner_image) {
            formData.append('banner_image', data.banner_image);
        }

        router.post('/blog', formData, {
            forceFormData: true, // This is important for file upload
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Blog" />
            <div className="flex justify-between items-center mb-6 mt-5">
                <h2 className="text-2xl font-bold text-gray-800">Create Blog</h2>
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-1 px-4 py-2 bg-gray-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
                >
                    <ArrowLeft size={16} />
                    Back to Bogs
                </Link>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title:
                        </label>
                        <input 
                            id="title"
                            name="title"
                            type="text"
                            value={data.title}
                            onChange={ (e) => setData('title', e.target.value) }
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-200"
                            placeholder="Enter title"
                        />
                        {errors.title && <div className="text-red-600 text-sm mt-1">{errors.title}</div>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description:
                        </label>
                        <textarea 
                            id="description"
                            name="description"
                            rows={4}
                            value={ data.description }
                            onChange={ (e) => setData('description', e.target.value) }
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-200"
                            placeholder="Enter Description" 
                        />
                        {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="banner_image" className="block text-sm font-medium text-gray-700">
                            Banner Image:
                        </label>
                        <input
                            id="banner_image"
                            name="banner_image"
                            type="file"
                            onChange={(e) => setData('banner_image', e.target.files?.[0] || null)}
                            className="mt-1 p-3 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-200"
                        />
                        {errors.banner_image && (
                            <div className="text-red-600 text-sm mt-1">{errors.banner_image}</div>
                        )}
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibound shadow-md hover:bg-blue-700 transition"
                        >
                            🚀 Create Blog
                        </button>
                    </div>
                </form>
            </div>

        </AppLayout>
    );
}