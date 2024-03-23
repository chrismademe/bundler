import React, { useState } from 'react';

export default function App() {
	const [count, setCount] = useState(0);

	function handleClick() {
		setCount(count + 1);
	}

	return (
		<div className="space-y-2">
			<img className="mx-auto w-12 h-12" src="dist/assets/react.svg" alt="React Logo" />
			<p>
				React count is <code>`{count}`</code>
			</p>
			<button className="bg-blue-700 px-4 py-1 rounded font-bold text-blue-50 text-sm" onClick={handleClick}>
				Increment
			</button>
		</div>
	);
}
