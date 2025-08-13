import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner"
import { SermonProvider } from "./context/sermon.context";

const App = () => {
  return (
    <SermonProvider>
      <Router>
        <AppRoutes />
        <Toaster richColors position="top-center" />
      </Router>
    </SermonProvider>
  );
};

export default App;
