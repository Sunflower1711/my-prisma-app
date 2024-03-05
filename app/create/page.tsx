'use client'

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"

const Create = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState([])
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const numCategoryId = parseInt(categoryId)
            await axios.post('/api/posts', { title, content, categoryId: numCategoryId })
            router.push('/')
        } catch (error) {
            console.error(error)
        }
    }

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`/api/categories/`)
            setCategories(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])
    return (
        <div className=" max-w-md mx-auto px-4 py-8">
            <h1 className="text-2x1 font-semibold mb-6">Create a New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="max-w-sm">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div className="max-w-sm">
                    <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Content
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                    </textarea>
                </div>
                <form className="max-w-sm ml-1">
                    <label
                        htmlFor="categoryId"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Category</label>
                    <select
                        name="categoryId"
                        id="categoryId"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled>กรุณาเลือก</option>
                        {categories.map((cate: any) => (
                            <option value={cate.id} key={cate.id}>{cate.name}</option>
                        ))}
                    </select>
                </form>
                <div className="gap-1 flex">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                    <Link
                        href={`/`}
                        className=" inline-flex justify-center py-2 px-4 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800">Back</Link>
                </div>
            </form>
        </div>
    );
}

export default Create