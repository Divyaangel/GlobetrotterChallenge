import React, { useState } from 'react';
import html2canvas from 'html2canvas';

const ChallengeFriend = ({ username, score }) => {
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    const generateInviteLink = () => {
        return `${window.location.origin}/play?challenger=${username}&score=${score}`;
    };

    const uploadImageToImgBB = async (imageData) => {
        const apiKey = '211a5dfc2f6579a69fe64f9ec2cbbf16'; // Replace with your ImgBB API key
        const formData = new FormData();
        formData.append('image', imageData.split(',')[1]); // Extract base64 data

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return data.data.url; // Return the uploaded image URL
    };

    const handleChallengeFriend = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const inviteLink = generateInviteLink();
            const element = document.querySelector('.game-container');

            if (!element) {
                throw new Error('Game container element not found');
            }

            // Capture the game container as an image
            const canvas = await html2canvas(element);
            const imageUrl = canvas.toDataURL('image/png');

            // Upload the image to ImgBB
            const uploadedImageUrl = await uploadImageToImgBB(imageUrl);

            // Create the share text with the image link
            const shareText = `Hey! Challenge me in the Globetrotter Challenge! My score: ${score}. Can you beat it? ${inviteLink}\n\nCheck out my game screenshot: ${uploadedImageUrl}`;

            // Open WhatsApp with the share text
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');

        } catch (error) {
            console.error('Error generating challenge:', error);
            setError('Failed to generate challenge. Please try again.');
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <button onClick={handleChallengeFriend} disabled={isLoading}>
                {isLoading ? 'Generating Challenge...' : 'Challenge a Friend'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ChallengeFriend;