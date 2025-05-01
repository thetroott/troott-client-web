import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import Preview from "./screens/Review";
import LoginForm from "./screens/auth/Login";


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
          <Routes>
            
            <Route path="/preview" element={<Preview/>}/>
            <Route path="/login" element={<LoginForm/>}/>

            
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </Router>
  );
};

export default App;
