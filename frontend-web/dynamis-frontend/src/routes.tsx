import { createBrowserRouter } from "react-router-dom";
import Test from "./components/Test";
import { Layout } from "./Layout";

export const router = createBrowserRouter([{

    path: '/',
    element: <Layout />,
    children: [
        {
            index: true,
            element: <div>Homepage</div>
        },
        {
            path: "workouts",
            element: <div>Workouts</div>
        },
        {
            path: "measurements",
            element: <div>Measurements</div>
        },
        {
            path: "settings",
            element: <div>Settings</div>
        },
        {
            path: "exercises",
            element: <div>Exercises</div>
        }
    ]
}]);