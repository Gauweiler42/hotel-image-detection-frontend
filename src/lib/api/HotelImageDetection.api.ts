import axios from 'axios';

class HotelImageDetectionAPI {
  private apiUrl: string;

  constructor() {
    if (process.env.API_URL === undefined) {
        throw new Error('No API Url defined');
    }

    this.apiUrl = process.env.API_URL;
  }

  async detectImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${this.apiUrl}/hotel-image-detection/predict`, formData);
      return response.data;
    } catch (error) {
      console.error('Error in image detection:', error);
      throw error;
    }
  }
}

export default HotelImageDetectionAPI;
