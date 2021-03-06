import { InstallerStepsFrame } from "src/components/installer/installer-steps-frame";
import { InstallerContextProvider } from "src/contexts/installer-context";

const InstallApp = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-4 divide-y">
        <div className="text-3xl pb-4">Welcome in the installer</div>
        <InstallerContextProvider>
          <InstallerStepsFrame />
        </InstallerContextProvider>
      </div>
    </div>
  );
};

export default InstallApp;
