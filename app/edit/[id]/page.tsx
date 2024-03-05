'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Edit = ({ params }: { params: { id: string } }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState([])
    const router = useRouter()
    const { id } = params

    // เพิ่มการดึง category
    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories')
            setCategories(response.data)
        } catch (error) {
            console.error('Failed to fetch categories', error)
        }
    }

    const fetchPost = async (id: Number) => {
        try {
            const res = await axios.get(`/api/posts/${id}`)
            setTitle(res.data.title)
            setContent(res.data.content)
            setCategoryId(res.data.categoryId || '')
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (id) {
            fetchPost(parseInt(id))
            fetchCategories()
        }
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const numCategoryId = parseInt(categoryId)
            console.log(numCategoryId)
            await axios.put(`/api/posts/${id}`, {
                title,
                content,
                categoryId: numCategoryId,
            })
            router.push('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-6">Edit Post {id}</h1>
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
                <div className="max-w-sm ml-1">
                    <label
                        htmlFor="categoryId"
                        className="block text-sm font-medium text-gray-700"
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
                </div>
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
    )
}

export default Edit