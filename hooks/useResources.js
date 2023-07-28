import { useState, useEffect } from "react";
import swr from "swr";
import { getAllCookieStands } from "@/services/cookieStands";
import { deleteCookieStand } from "@/services/cookieStands";
import { addCookieStand as addCookieStandService } from "@/services/cookieStands";

const useResources = () => {
  const [cookieStands, setCookieStands] = useState([]);
  const [fetchStandsStatus, setFetchStandsStatus] = useState({
    loading: false,
    error: null,
  });
  const [addStandStatus, setAddStandStatus] = useState({
    loading: false,
    error: null,
  });
  const [deletingError, setDeletingError] = useState(null);

  useEffect(() => {
    async function fetchCookies() {
      setFetchStandsStatus({ loading: true, error: null });
      try {
        const data = await getAllCookieStands();
        setCookieStands(data);
        setFetchStandsStatus({ loading: false, error: null });
      } catch (error) {
        setFetchStandsStatus({ loading: false, error: error.message });
      }
    }
    fetchCookies();
  }, []);

  const handleAddCookieStand = async (cookieStand) => {
    setAddStandStatus({ loading: true, error: null });

    setCookieStands((cookieStands) => [...cookieStands, cookieStand]);
    try {
      const createdCookie = await addCookieStandService(cookieStand);
      setCookieStands((cookieStands) => [...cookieStands, createdCookie]);
    } catch (error) {
      setAddStandStatus({ loading: false, error: error.message });
    } finally {
      setCookieStands((cookieStands) =>
        cookieStands.filter((stand) => stand !== cookieStand)
      );
      setAddStandStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleDeleteCookieStand = async (standToDelete) => {
    setDeletingError(null);
    const prev = [...cookieStands];
    setCookieStands((cookieStands) =>
      cookieStands.map((stand) => {
        if (stand === standToDelete) {
          return { ...stand, deleting: true };
        }
        return stand;
      })
    );
    try {
      await deleteCookieStand(standToDelete.id);
      setCookieStands((cookieStands) =>
        cookieStands.filter((stand) => stand.id !== standToDelete.id)
      );
    } catch (error) {
      console.error({ error });
      setCookieStands(prev);
      setDeletingError(error.message);
    }
  };
  return {
    cookieStands,
    fetchStandsStatus,
    addStandStatus,
    deletingError,
    handleAddCookieStand,
    handleDeleteCookieStand,
  };
};
export default useResources;
