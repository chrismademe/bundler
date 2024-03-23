import { createRoot } from 'react-dom/client';

import App from './App.jsx';

// Render your React component instead
const root = createRoot(document.getElementById('react'));
root.render(<App />);
