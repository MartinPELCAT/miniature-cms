import { InstallerStepsFrame } from "src/components/installer/installer-steps-frame";
import { Logo } from "src/components/logo";
import { InstallerContextProvider } from "src/contexts/installer-context";

const InstallApp = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-4 divide-y">
        <div className="text-2xl pb-4 flex items-center space-x-4">
          <Logo width={40} height={30} />
          <span>Welcome in the installer</span>
        </div>
        <InstallerContextProvider>
          <InstallerStepsFrame />
        </InstallerContextProvider>
      </div>
    </div>
  );
};

export default InstallApp;
