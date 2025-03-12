import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

interface Rocket {
  id: string;
  name: string;
  description: string;
  company: string;
  country: string;
  first_flight: string;
  cost_per_launch: number;
  flickr_images: string[];
}

export const useRocketStore = defineStore("rocket", () => {
  // State
  const rocketList = ref<Rocket[]>([]);
  const loading = ref<boolean>(false);
  const rocketDetail = ref<Rocket | null>(null);
  const info = ref<string>("");
  const action = ref<string>("");
  const open = ref<boolean>(false);

  // Actions
  const getRocketList = async (): Promise<void> => {
    try {
      loading.value = true;
      const response = await axios.get<Rocket[]>(
        `${import.meta.env.VITE_APP_API_BASE_URL}/rockets`
      );
      rocketList.value = response.data;
      loading.value = false;
    } catch (error: any) {
      info.value = error.message;
      open.value = true;
      loading.value = false;
    }
  };

  const getRocketById = async (id: String): Promise<void> => {
    try {
      loading.value = true;
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/rockets/${id}`
      );
      rocketDetail.value = response.data;
      loading.value = false;
    } catch (error) {
      loading.value = false;
    }
  };

  const setSuccess = (message: string): void => {
    info.value = message;
    open.value = true;
    action.value = "success";
  };

  return {
    rocketList,
    loading,
    rocketDetail,
    open,
    info,
    action,
    getRocketList,
    getRocketById,
    setSuccess,
  };
});
