import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLessonsThunk } from "../store/slices/lessonsSlice";
import { useAuth } from "../utils/AuthContext";

const LoadData = () => {
  const { loading } = useAuth();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    if (!loading) {
      dispatch(getLessonsThunk(userId));
    }
  }, [loading]);
};

export default LoadData;
