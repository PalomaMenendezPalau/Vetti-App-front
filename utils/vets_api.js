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
        const [vets, events] = await Promise.all([fetchVets(), fetchVetEvents()]);
        const eventsByVetName = events.reduce((acc, event) => {
            const vetNameLower = event.vetName.toLowerCase(); 
            if (!acc[vetNameLower]) {
                acc[vetNameLower] = [];
            }
            acc[vetNameLower].push(event);
            return acc;
        }, {});

        const combinedData = vets.map((vet) => {
            const vetNameLower = vet.name.toLowerCase(); 
            const vetEvents = eventsByVetName[vetNameLower] || [];
            return { ...vet, events: vetEvents };
        });

        await saveVetData(combinedData);

        console.log("Combined vet data saved successfully:", JSON.stringify(combinedData, null, 2));
        return combinedData;
    } catch (error) {
        console.error("Error fetching and saving combined vet data:", error.message);
        throw error;
    }
};
