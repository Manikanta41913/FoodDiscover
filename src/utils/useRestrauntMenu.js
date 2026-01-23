import { useEffect, useState } from "react";
import { MENU_API } from "../utils/constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(MENU_API + resId);
      if (!data.ok) throw new Error('API failed');
      const json = await data.json();
      setResInfo(json.data);
    } catch (error) {
      console.log("Menu API failed, using mock data");
      const mockData = await import("../components/mocks/mockResMenu.json");
      setResInfo(mockData.data);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;
