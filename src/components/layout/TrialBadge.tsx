
import React from "react";
import { BeakerIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const TrialBadge: React.FC = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800">
            <BeakerIcon className="h-3 w-3 mr-1" />
            Trial Mode
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>You're using a trial account with limited functionality</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TrialBadge;
