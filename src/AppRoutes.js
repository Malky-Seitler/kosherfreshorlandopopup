import HomePage from "./HomePage";
import SubmitPage from "./SubmitPage";

const AppRoutes = [
    {
        index: true,
        element: <HomePage />,
    },
    { path: '/submit', element: <SubmitPage /> }

    // { path: '/finances', element: <Finances /> }
];

export default AppRoutes;
