import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
});

export const fetchPrediction = async (crop, district) => {
    try {
        const res = await client.post('/predict', { crop_name: crop, district: district });
        return res.data;
    } catch {
        // Offline simulation fallback for testing UI independently
        return {
            crop,
            district,
            current_price: 2450,
            predicted_price: 2890,
            trend: 'up',
            recommendation: 'Wholesale arrivals are dropping in APMC. Holding for 4-5 days could yield +17% return.',
        };
    }
};

export const fetchChatReply = async (query) => {
    try {
        const res = await client.post('/chat/ask', { message: query });
        return res.data;
    } catch {
        // Fallback response if FastAPI backend is not yet active
        return {
            reply: `Regarding "${query}": Mandi prices for onion and soybean in Maharashtra are holding steady. Demand is expected to rise next week.`,
        };
    }
};
