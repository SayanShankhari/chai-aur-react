import React from 'react'
import { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router';

export default function Github() {
/*
	const [data, setData] = useState ([]);

	useEffect (() => {
		fetch ("https://api.github.com/users/sayanshankhari")
		.then (response => response.json())
		.then (data => {
			setData (data);
		});
	}, []);
*/

	// use loader to pre-load data (even before useEffect) and cache it
	const data = useLoaderData(); // internally manages the state

	return (
		<div className='text-center m-4 bg-grey-600 text-gray-700 p-4 text-3xl'>
			<img src={data.avatar_url} alt="Git Profile" className='h-20 w-20 rounded-full object-cover' />
			#{data.followers} followers
		</div>
	)
}

// to prepare loader function for Route used in routes
export const githubInfoLoader = async () => {
	const response = await fetch ("https://api.github.com/users/sayanshankhari");
	return response.json(); // response is a promise
}
// can also be done directly via callback from routes without creating this function
/*
<Route path="github" element={ <pages.Github/> } loader={async () => {
	const response = await fetch ("https://api.github.com/users/sayanshankhari");
	return response.json(); // response is a promise
}} />
*/