import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import AppRoutes from "./routes";

const App = () => {
  const errorHandler = (err: any, info: any) => {
    console.log(err, "logged error");
    console.log(info, "logged error info");
  };

  return (
    <Router>
      <Suspense fallback={<></>}>
        <ErrorBoundary
          FallbackComponent={() => <></>}
          onReset={() => {
            window.location.reload();
          }}
          onError={errorHandler}
        >
          <AppRoutes />
        </ErrorBoundary>
      </Suspense>
    </Router>
  );
};

export default App;
