import api from './api';
import { saveVetData } from './storage';

export const fetchVets = async () => {
    try {
        const response = await api.get('/vet/searchVets');
        console.log('Vets fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching vets:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const fetchVetEvents = async () => {
    try {
        const response = await api.get('/calendly/vet/events');
        console.log('Vet events fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching vet events:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const fetchAndSaveCombinedVetData = async () => {
    try {
        // Fetch data from both endpoints concurrently
        const [vets, events] = await Promise.all([fetchVets(), fetchVetEvents()]);

        // Create a map of events grouped by vetName for efficient lookup
        const eventsByVetName = events.reduce((acc, event) => {
            if (!acc[event.vetName]) {
                acc[event.vetName] = [];
            }
            acc[event.vetName].push(event); // Add event to the respective vetName key
            return acc;
        }, {});

        // Combine vets and their corresponding events
        const combinedData = vets.map((vet) => {
            const vetEvents = eventsByVetName[vet.name] || []; // Default to empty array if no events
            return { ...vet, events: vetEvents };
        });

        // Save the combined data to local storage
        await saveVetData(combinedData);

        console.log("Combined vet data saved successfully:", JSON.stringify(combinedData, null, 2));
        return combinedData;
    } catch (error) {
        console.error("Error fetching and saving combined vet data:", error.message);
        throw error;
    }
};