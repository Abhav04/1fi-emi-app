import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductListPage />} />
          <Route path="products/:slug" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
