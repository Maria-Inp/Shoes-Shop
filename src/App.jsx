import { Routes, Route, Navigate } from "react-router-dom";

import ProductsProvider from "./context/ProductsContext";

import Layout from "./layout/Layout";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import LikedPage from "./pages/LikedPage";
import CardProvider from "./context/CardContext";
import LikeProvider from "./context/LikeContext";

function App() {
  return (
    <>
      <CardProvider>
        <ProductsProvider>
          <LikeProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/products" replace />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/liked" element={<LikedPage />} />
                <Route path="/*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </LikeProvider>
        </ProductsProvider>
      </CardProvider>
    </>
  );
}

export default App;
