import "@libs/zodConfig";

import QueryClientProvider from "@providers//QueryClientProvider";
import ThemeProvider from "@providers//ThemeProvider";
import RouterProvider from "@providers//RouterProvider";
import ToastProvider from "@providers//ToastProvider";
import AuthProvider from "@providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider>
        <ThemeProvider>
          <ToastProvider>
            <RouterProvider />
          </ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
