import { useUser } from '../context/UserContext';
import { Share2, Twitter, Gift } from 'lucide-react';
import PageContainer from '../components/PageContainer';
import confetti from '../utils/confetti';
import { useEffect } from 'react';

const PrizeAwardedPage: React.FC = () => {
  const { state } = useUser();
  
  useEffect(() => {
    // Trigger confetti effect when page loads
    confetti();
  }, []);
  
  return (
    <PageContainer>
      <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl text-center">
        <div className="mb-6">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-4">
            <Gift size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-white">
            Congratulations!
          </h1>
          <p className="text-xl text-yellow-300 font-bold">
            You won: {state.prize || 'A Prize'}
          </p>
        </div>
        
        <div className="bg-white/5 p-6 rounded-lg mb-8">
          <p className="mb-4">
            Thank you for participating! Your prize will be sent to you shortly.
          </p>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1DA1F2] hover:bg-[#1a94df] text-white rounded-full font-bold transition-all transform hover:scale-105">
              <Twitter size={20} />
              <span>Share on Twitter</span>
            </button>
            
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold transition-all transform hover:scale-105">
              <Share2 size={20} />
              <span>Share with Friends</span>
            </button>
          </div>
        </div>
        
        <div className="text-sm text-gray-300">
          <p>Prize redemption instructions will be sent to you.</p>
          <p className="mt-2">Thank you for participating!</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default PrizeAwardedPage;