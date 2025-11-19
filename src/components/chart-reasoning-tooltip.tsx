import QuestionIcon from "@/assets/icons/ic_question";
import Tooltip from "@/components/tooltip";

interface ChartReasoningTooltipProps {
  reasoning: string;
}

export default function ChartReasoningTooltip({
  reasoning,
}: ChartReasoningTooltipProps) {
  return (
    <div className="absolute top-0 right-0 z-10">
      <Tooltip content={reasoning} width="320px">
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors">
          <QuestionIcon color="#6B7280" width={18} height={18} />
        </div>
      </Tooltip>
    </div>
  );
}
