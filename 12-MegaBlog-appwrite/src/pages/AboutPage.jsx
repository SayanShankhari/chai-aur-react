import React from 'react';

export default function AboutPage() {
	return (
		<section class="bg-white py-16 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
	<div class="text-center mb-16">
	  <h2 class="text-base font-semibold text-indigo-600 tracking-wide uppercase">Our Story</h2>
	  <p class="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">We’re on a mission to simplify tech.</p>
	  <p class="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">What started as a small personal project in 2020 has grown into a community of over 50,000 monthly readers.</p>
	</div>
	<div class="bg-indigo-700 rounded-2xl shadow-xl mb-20">
	  <div class="grid grid-cols-1 gap-y-10 py-12 px-6 sm:grid-cols-3 sm:gap-x-8 text-center">
		<div><p class="text-4xl font-bold text-white">500+</p><p class="mt-1 text-indigo-100 font-medium">Articles</p></div>
		<div><p class="text-4xl font-bold text-white">50K</p><p class="mt-1 text-indigo-100 font-medium">Readers</p></div>
		<div><p class="text-4xl font-bold text-white">100%</p><p class="mt-1 text-indigo-100 font-medium">Free</p></div>
	  </div>
	</div>
	<div class="mb-16">
	  <h3 class="text-3xl font-bold text-gray-900 text-center mb-12">Meet the Writers</h3>
	  <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
		<div class="flex flex-col items-center text-center">
		  <img class="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white" src="https://images.unsplash.com" alt="Author"/>
		  <h4 class="mt-4 text-xl font-bold text-gray-900">Jane Doe</h4>
		  <p class="text-indigo-600 font-medium">Founder</p>
		</div>
	  </div>
	</div>
  </div>
</section>
	)
}