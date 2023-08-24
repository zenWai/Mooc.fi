import ReactDOM from 'react-dom/client'
import App from './App'
import {QueryClient, QueryClientProvider} from "react-query";
import {NotificationProvider} from "./components/NotificationContext.jsx";


const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <QueryClientProvider client={queryClient}>
      <App/>
    </QueryClientProvider>
  </NotificationProvider>
)