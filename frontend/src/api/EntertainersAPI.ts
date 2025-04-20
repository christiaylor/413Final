import { Entertainer } from '../types/Entertainer';

interface FetchEntertainersResponse {
  entertainers: Entertainer[];
  totalNumEntertainers: number;
}

const API_URL = 'https://localhost:5000/api/Entertainer'; // Change when deployed

export const fetchEntertainers = async (
  pageSize: number,
  pageNum: number
  // selectedCategories: string[]
): Promise<FetchEntertainersResponse> => {
  try {
    // const categoryParams = selectedCategories
    // .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
    // .join('&');

    const url = `${API_URL}/AllEntertainers?pageLength=${pageSize}&pageNum=${pageNum}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch entertainers');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching entertainers:', error);

    throw error;
  }
};

export const addEntertainer = async (
  newEntertainer: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/AddEntertainer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntertainer),
    });
    if (!response.ok) {
      throw new Error('Failed to add entertainer');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding entertainer', error);
    throw error;
  }
};

export const updateEntertainer = async (
  entertainerID: number,
  updatedEntertainer: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(
      `${API_URL}/UpdateEntertainer/${entertainerID}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEntertainer),
      }
    );
    return await response.json();
  } catch (error) {
    console.error('Error updating entertainer: ', error);
    throw error;
  }
};

export const deleteEntertainer = async (
  entertainerID: number
): Promise<void> => {
  try {
    const response = await fetch(
      `${API_URL}/DeleteEntertainer/${entertainerID}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete entertainer');
    }
  } catch (error) {
    console.error('Error deleting entertainers:', error);
    throw error;
  }
};

// import { Entertainer } from '../types/Entertainer';

interface FetchEntertainersResponse {
  entertainers: Entertainer[];
  totalNumEntertainers: number;
}

// Define a new interface for the data from /bookingInfo
export interface EntertainerWithBookingInfo {
  entertainerID: number;
  entStageName?: string | null;
  engagementCount?: number | 0;
  startDate?: string | null;
}

interface FetchEntertainersWithBookingInfoResponse {
  entertainers: EntertainerWithBookingInfo[];
  totalNumEntertainers: number; // Assuming your /bookingInfo endpoint also returns total count
}

// New function to fetch entertainers with booking information
export const fetchEntertainersWithBookingInfo = async (
  pageSize: number,
  pageNum: number
): Promise<FetchEntertainersWithBookingInfoResponse> => {
  try {
    const url = `${API_URL}/bookingInfo?pageLength=${pageSize}&pageNum=${pageNum}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch entertainers with booking info');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching entertainers with booking info:', error);
    throw error;
  }
};
