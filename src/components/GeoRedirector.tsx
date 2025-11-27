import { useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';

const GeoRedirector = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Temporarily disable geo-redirect to keep users on home page with map
    // Only redirect if user is on the home page
    // if (pathname !== "/") return;

    // fetch("https://ipinfo.io/json?token=854804bf0b402a")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const city = data.city?.toLowerCase();
        
    //     // Redirect based on city
    //     switch (city) {
    //       case "windsor":
    //         router.push("/residential/windsor");
    //         break;
    //       case "fort collins":
    //         router.push("/residential/fort-collins");
    //         break;
    //       case "wellington":
    //         router.push("/residential/wellington");  
    //         break;
    //       case "greeley":
    //         router.push("/residential/greeley");
    //         break;
    //       case "severance":
    //         router.push("/residential/severance");
    //         break;
    //       default:
    //         // For other areas, redirect to north-county
    //         if (data.region === "Colorado") {
    //           router.push("/residential/north-county");
    //         }
    //         break;
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("Geo-redirect failed:", error);
    //     // Silently fail - user stays on current page
    //   });
  }, [router, pathname]);

  return null;
};

export default GeoRedirector;
