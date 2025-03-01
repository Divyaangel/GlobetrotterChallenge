import React from 'react';
import html2canvas from 'html2canvas'; // This should now work

const ChallengeFriend = ({ username, score }) => {
    const generateInviteLink = () => {
        return `${window.location.origin}/play?challenger=${username}&score=${score}`;
    };

    const handleChallengeFriend = async () => {
        const inviteLink = generateInviteLink();
        const element = document.querySelector('.game-container');
        const canvas = await html2canvas(element);
        const imageUrl = canvas.toDataURL('image/png');
        const shareText = `Hey! Challenge me in the Globetrotter Challenge! My score: ${score}. Can you beat it? ${inviteLink}`;

        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
    };

    return (
        <button onClick={handleChallengeFriend}>Challenge a Friend</button>
    );
};




export default ChallengeFriend;