import { useParams } from 'react-router-dom';

export default function User() {
	const {userid} = useParams();

	return (
		<div className='bg-blue-500 text-white text-3xl'>User: {userid}</div>
	);
}