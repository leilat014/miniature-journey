export interface Trip {
    id: string;
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    description?: string;
    status: "planned" | "in-progress" | "completed";
    travelers: Array<string>;
    itinerary?: Array<{
        day: number;
        activities: string;
        location: string;
    }>;
    budget?: number;
    notes?: string;

}