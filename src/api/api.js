// api.js
import axios from "axios";

const API_URL = "http://localhost:4000";

// ------------------- USER AUTH -------------------
// Register
export const regg = async (data) => {
  try {
    return await axios.post(`${API_URL}/user/register`, data);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login
export const logg = async (data) => {
  try {
    return await axios.post(`${API_URL}/user/login`, data);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
export const getUsers = async () => {
  try {
    return await axios.get(`${API_URL}/user/getAllUsers`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ------------------- TRACK -------------------
// Create Mood Track
// ------------------- TRACK -------------------

export const createTrack = async (data) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    return await axios.post(`${API_URL}/Track/createtrack`, {
      ...data,
      userId: user._id,
    });
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getTracks = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    return await axios.get(`${API_URL}/Track/gettrack`, {
      params: { userId: user._id },
    });
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
// ------------------- PREGNANCY -------------------
export const createPregnancy = async (data) => {
  try {
    return await axios.post(`${API_URL}/Pregnancy/create`, data);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getLatestPregnancy = async () => {
  try {
    return await axios.get(`${API_URL}/Pregnancy/latest`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ------------------- REPORTS -------------------

// Upload Report
// Upload Report
// api.js
// api.js
// ------------------- REPORTS -------------------

// ------------------- REPORTS -------------------

// ------------------- REPORTS -------------------

export const uploadReport = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found. Please login again.");
    }

    const res = await axios.post(
      `${API_URL}/report/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return res;

  } catch (error) {
    console.error("Upload API error:", error.response || error);
    throw error.response?.data || error.message;
  }
};

export const getReports = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API_URL}/report/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res;

  } catch (error) {
    console.error(error);
    throw error.response?.data || error.message;
  }
};
export const saveChecklist = async (data) => {
  try {
    return await axios.post(`${API_URL}/checklist/save`, data);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getChecklist = async (userId) => {
  try {
    return await axios.get(`${API_URL}/checklist/user/${userId}`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
// ------------------- ORDERS -------------------
export const createOrder = async (data) => {
  try {
    return await axios.post(`${API_URL}/api/orders/create`, data);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getOrders = async () => {
  try {
    return await axios.get(`${API_URL}/api/orders/all`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ------------------- PRODUCTS -------------------
const PRODUCTS_URL = `${API_URL}/api/products`;

export const getProducts = async () => {
  try {
    return await axios.get(PRODUCTS_URL);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProductById = async (id) => {
  try {
    return await axios.get(`${PRODUCTS_URL}/${id}`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createProduct = async (data) => {
  try {
    return await axios.post(PRODUCTS_URL, data);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateProduct = async (id, data) => {
  try {
    return await axios.put(`${PRODUCTS_URL}/${id}`, data);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteProduct = async (id) => {
  try {
    return await axios.delete(`${PRODUCTS_URL}/${id}`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ------------------- CYCLE -------------------
export const saveCycle = async (data) => {
  try {
    return await axios.post(`${API_URL}/cycle/save`, data);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCycle = async (userId) => {
  try {
    return await axios.get(`${API_URL}/cycle/${userId}`);
  } catch (error) {
    // ✅ If no data exists, return safe response instead of throwing
    if (error.response?.status === 404) {
      return { data: { cycle: null } };
    }

    // ❌ Only throw real errors
    throw error.response?.data || error.message;
  }
};


export const getWater = async (userId, date) => {
  return await axios.get(`${API_URL}/api/water/${userId}/${date}`);
};

export const updateWater = async (userId, date, intake) => {
  return await axios.put(`${API_URL}/api/water/${userId}/${date}`, {
    intake
  });
};
export const getAllProducts = async () => {
  return await axios.get(`${API_URL}/api/products/all`);
};