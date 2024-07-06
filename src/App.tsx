import CssBaseline from "@mui/material/CssBaseline";

import QueryClientProvider from "./providers/QueryClientProvider";
import ThemeProvider from "./providers/ThemeProvider";
import RouterProvider from "./providers/RouterProvider";
import ToastProvider from "./providers/ToastProvider";

function App() {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <ToastProvider>
          <CssBaseline />
          <RouterProvider />
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
