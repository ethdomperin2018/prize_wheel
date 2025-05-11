// This file would interact with your actual FastAPI backend

export const verifyTwitterFollow = async (username: string): Promise<{ success: boolean, message?: string }> => {
  try {
    const response = await fetch('http://localhost:8000/api/verify-twitter-follow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.detail || 'Failed to verify Twitter follow' };
    }

    const data = await response.json();
    return { success: data.success, message: data.message };
  } catch (error) {
    console.error('Error verifying Twitter follow:', error);
    return { success: false, message: 'An error occurred while verifying Twitter follow' };
  }
};

export const spinWheel = async (): Promise<{ prize: string }> => {
  // In a real app, this would send a request to your backend
  // For demo purposes, we'll simulate a wheel spin
  console.log('Spinning the wheel...');
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Possible prizes
  const prizes = [
    '10% OFF', '25% OFF', '50% OFF', 'FREE TRIAL', 
    'MERCH', '$10 GIFT CARD', '$25 GIFT CARD', 'GRAND PRIZE'
  ];
  
  // Return a random prize
  const randomIndex = Math.floor(Math.random() * prizes.length);
  return { prize: prizes[randomIndex] };
};