// Code to fetch OEM data from the server
const fetchOEM = async (values) => {
    try {
        const response = await fetch('http://localhost:9000/oem', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }

};

export default fetchOEM;
