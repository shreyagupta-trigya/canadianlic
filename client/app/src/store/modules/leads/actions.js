export const fetchData = async ({ commit }) => {
    try {
      const response = await axios.get('/api/your-endpoint'); // Replace with your API endpoint
      commit('SET_DATA', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };