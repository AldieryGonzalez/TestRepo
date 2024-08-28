import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Menu from "./navigation/Menu";
import FoundPage from "./pages/FoundPage";
import LostPage from "./pages/LostPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";

import { useDbData } from "./utilities/firebase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const App = () => {
  const { user } = useAuth();
  const [data, error] = useDbData("/");
  if (error) return <h1>Error loading data</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;
  // console.log("user", user);

  return (
    <div className="main-app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}>
            <Route path="/" element={<FoundPage posts={data.foundPosts} />} />
            <Route
              path="lostpage"
              element={<LostPage posts={data.lostPosts} />}
            />
            <Route path="postpage" element={<PostPage />} />
            <Route
              path="profilepage"
              element={
                <ProfilePage
                  lostPosts={data.lostPosts}
                  foundPosts={data.foundPosts}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
