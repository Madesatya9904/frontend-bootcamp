import axios from 'axios';
import React from 'react';

const instance = axios.create()

instance.interceptors.response.use(
  (response) => {
    return response; // Response berhasil, kembalikan seperti biasa
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect ke halaman login jika status 401 (unauthorized)
      window.location.href = "/login";
      localStorage.removeItem("user"); // Hapus data user dari localStorage
    }
    // Lempar error agar bisa ditangani lebih lanjut
    return error;
  }
);

export default instance;
  