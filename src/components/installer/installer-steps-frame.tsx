import { useState } from "react";
import { InstallerAdminConfig } from "./installer-admin-config";
import { InstallerDatabaseConfig } from "./installer-database-config";

export const InstallerStepsFrame = () => {
  const [installerStep, setInstallerStep] = useState<number>(0);

  const handleNextStep = () => {
    if (installerStep + 1 < steps.length) {
      setInstallerStep((state) => state + 1);
    }
  };

  const steps = [
    <InstallerDatabaseConfig onNextStep={handleNextStep} />,
    <InstallerAdminConfig onNextStep={handleNextStep} />,
  ];

  return steps[installerStep];
};
