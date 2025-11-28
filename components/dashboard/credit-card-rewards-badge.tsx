import { Gift, Award, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CreditCardRewardsBadgeProps {
  rewardsProgram: string | null
  rewardsRate: number | null
  rewardsCategory: string | null
}

export function CreditCardRewardsBadge({ rewardsProgram, rewardsRate, rewardsCategory }: CreditCardRewardsBadgeProps) {
  if (!rewardsProgram && !rewardsRate) return null

  // Determine badge color based on rewards rate
  const getBadgeColor = () => {
    if (!rewardsRate) return "bg-slate-500"
    if (rewardsRate >= 3) return "bg-purple-500" // Excellent rewards
    if (rewardsRate >= 2) return "bg-blue-500" // Good rewards
    return "bg-slate-500" // Basic rewards
  }

  // Determine icon based on rewards program type
  const getIcon = () => {
    if (!rewardsProgram) return <Gift className="h-3 w-3 mr-1" />

    const program = rewardsProgram.toLowerCase()
    if (program.includes("cash") || program.includes("money")) {
      return <Award className="h-3 w-3 mr-1" />
    } else if (program.includes("travel") || program.includes("miles") || program.includes("airline")) {
      return <Star className="h-3 w-3 mr-1" />
    }
    return <Gift className="h-3 w-3 mr-1" />
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={`${getBadgeColor()} cursor-help`}>
            {getIcon()}
            {rewardsRate ? `${rewardsRate}% ` : ""}
            {rewardsProgram || "Rewards"}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1 max-w-xs">
            <p className="font-medium">{rewardsProgram || "Rewards Program"}</p>
            {rewardsRate && <p>{rewardsRate}% back on purchases</p>}
            {rewardsCategory && <p>Best for: {rewardsCategory}</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
