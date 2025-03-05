
import React from "react";
import { Button } from "@/components/ui/button";
import { BeakerIcon } from "lucide-react";

interface TrialLoginButtonProps {
  onTrialLogin: () => void;
}

const TrialLoginButton: React.FC<TrialLoginButtonProps> = ({ onTrialLogin }) => {
  return (
    <Button 
      variant="outline" 
      onClick={onTrialLogin}
      className="w-full"
    >
      <BeakerIcon className="mr-2 h-4 w-4" />
      Continue as Trial User
    </Button>
  );
};

export default TrialLoginButton;
