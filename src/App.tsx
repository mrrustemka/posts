import { PostsPage } from "./posts/PostsPage";
import { createBrowserRouter, RouterProvider, defer } from "react-router-dom";
import { getPosts } from "./posts/getPosts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <PostsPage />,
    loader: async () => {
      const existingData = queryClient.getQueryData(["postsData"]);
      if (existingData) {
        return defer({ posts: existingData });
      }
      return defer({ posts: queryClient.fetchQuery(["postsData"], getPosts) });
    },
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
export default App;
