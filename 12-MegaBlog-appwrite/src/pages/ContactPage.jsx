import React from 'react'

export default function ContactPage() {
	return (
		<div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
            <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Get in touch
            </h2>
            <p class="mt-4 text-lg text-gray-600">
                Have a question or just want to say hi? We'd love to hear from you.
            </p>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-5xl px-4">
            <div class="bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                <div class="bg-blue-600 p-10 text-white flex flex-col justify-between">
                    <div>
                        <h3 class="text-2xl font-bold mb-6">Contact Information</h3>
                        <p class="text-blue-100 mb-8">Fill out the form and our team will get back to you within 24 hours.</p>
                        
                        <div class="space-y-6">
                            <div class="flex items-center space-x-4">
                                <span class="p-3 bg-blue-500 rounded-full">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                </span>
                                <span>+1 (555) 000-0000</span>
                            </div>
                            <div class="flex items-center space-x-4">
                                <span class="p-3 bg-blue-500 rounded-full">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </span>
                                <span>hello@example.com</span>
                            </div>
                            <div class="flex items-center space-x-4">
                                <span class="p-3 bg-blue-500 rounded-full">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </span>
                                <span>123 Design St, Innovation City</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex space-x-6 mt-12">
                        <a href="#" class="hover:text-blue-200 transition-colors">Twitter</a>
                        <a href="#" class="hover:text-blue-200 transition-colors">LinkedIn</a>
                        <a href="#" class="hover:text-blue-200 transition-colors">Instagram</a>
                    </div>
                </div>

                <div class="p-10 bg-white">
                    <form action="#" method="POST" class="space-y-6">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">First Name</label>
                                {/* <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 bg-gray-50 border"> */}
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Last Name</label>
                                {/* <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 bg-gray-50 border"> */}
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Email Address</label>
                            {/* <input type="email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 bg-gray-50 border"> */}
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Subject</label>
                            <select class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 bg-gray-50 border">
                                <option>General Inquiry</option>
                                <option>Support</option>
                                <option>Sales</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Message</label>
                            <textarea rows="4" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 bg-gray-50 border"></textarea>
                        </div>

                        <div>
                            <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
	)
}