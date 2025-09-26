import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";
import { AppProvider } from "./context/app/app.context";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
        <Toaster richColors position="top-center" />
      </Router>
    </AppProvider>
  );
};

export default App;
