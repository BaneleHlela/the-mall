import { Routes, Route } from "react-router-dom";
import AddStoreForm from "./stores/AddStore";
import ProtectedRoute from "../components/mall/authorization/ProtectedRoute";

const Stores = () => {
  return (
    <>
      <div>Stores</div>
      <Routes>
        {/* <Route 
          path="add" 
          element={
            <ProtectedRoute>
              <AddStoreForm />
            </ProtectedRoute>
          } 
        /> */}
        <Route 
          path="add" 
          element={
              <AddStoreForm />
          } 
        />
      </Routes>
    </>
  );
};

export default Stores;
