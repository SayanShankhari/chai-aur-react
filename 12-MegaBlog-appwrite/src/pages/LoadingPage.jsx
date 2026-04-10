export default function LoadingPage() {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
			<div className="animate-spin rounded-full h-16 w-16 border-4 border-t-blue-500 border-b-blue-700"></div>
		</div>
	);
}