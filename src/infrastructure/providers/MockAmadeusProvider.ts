
// This class simulates an external GDS provider.
// In a real scenario, this would make HTTP calls to Amadeus APIs.
export class MockAmadeusProvider {
    async getFlightDetails(pnr: string): Promise<{ origin: string, destination: string, distance: number }> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100));

        console.log(`[MockAmadeus] Fetching flight details for PNR: ${pnr}`);

        return {
            origin: 'SCL',
            destination: 'MIA',
            distance: 4100 // miles
        };
    }
}
