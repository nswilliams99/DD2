import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GeoRedirector = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Temporarily disable geo-redirect to keep users on home page with map
    // Only redirect if user is on the home page
    // if (location.pathname !== "/") return;

    // fetch("https://ipinfo.io/json?token=854804bf0b402a")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const city = data.city?.toLowerCase();
        
    //     // Redirect based on city
    //     switch (city) {
    //       case "windsor":
    //         navigate("/residential/windsor");
    //         break;
    //       case "fort collins":
    //         navigate("/residential/fort-collins");
    //         break;
    //       case "wellington":
    //         navigate("/residential/wellington");  
    //         break;
    //       case "greeley":
    //         navigate("/residential/greeley");
    //         break;
    //       case "severance":
    //         navigate("/residential/severance");
    //         break;
    //       default:
    //         // For other areas, redirect to north-county
    //         if (data.region === "Colorado") {
    //           navigate("/residential/north-county");
    //         }
    //         break;
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("Geo-redirect failed:", error);
    //     // Silently fail - user stays on current page
    //   });
  }, [navigate, location.pathname]);

  return null;
};

export default GeoRedirector;