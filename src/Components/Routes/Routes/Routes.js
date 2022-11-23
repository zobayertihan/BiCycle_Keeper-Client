const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main");

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/'
            }
        ]
    }
])