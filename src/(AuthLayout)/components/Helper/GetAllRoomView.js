import { useState, useEffect } from "react";
import { GET_API } from "../API/GetAPI";

const GetAllRoomView = () => {
  const [roomViewValue, setroomViewValue] = useState([]);

  const getAllRoomV = async () => {
    const GET_ALL_CATEGORIES = `{
        getRViews {
            id
            name
        }
    }`;
    const query = GET_ALL_CATEGORIES;
    const path = "";

    try {
      const res = await GET_API(path, { params: { query } });

      if (Array.isArray(res.data.getRViews)) {
        const dataArray = res.data.getRViews.map((item) => ({
          value: item.id ? item.id : "",
          label: item.name ? item.name : "",
        }));
        setroomViewValue(dataArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllRoomV();
  }, []);

  return { roomViewValue, getAllRoomV };
};

export default GetAllRoomView;
