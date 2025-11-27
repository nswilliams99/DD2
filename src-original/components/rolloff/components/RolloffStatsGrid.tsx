
import { TownContent } from '../utils/townContent';

interface RolloffStatsGridProps {
  content: TownContent;
}

const RolloffStatsGrid = ({ content }: RolloffStatsGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 pt-4">
      <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
        <div className="text-lg font-bold text-white font-poppins">{content.sizes}</div>
        <div className="text-xs text-gray-200 font-inter">YARD SIZES</div>
      </div>
      <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
        <div className="text-lg font-bold text-white font-poppins">{content.delivery}</div>
        <div className="text-xs text-gray-200 font-inter">DELIVERY</div>
      </div>
      <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
        <div className="text-lg font-bold text-white font-poppins">{content.service}</div>
        <div className="text-xs text-gray-200 font-inter">SERVICE</div>
      </div>
    </div>
  );
};

export default RolloffStatsGrid;
