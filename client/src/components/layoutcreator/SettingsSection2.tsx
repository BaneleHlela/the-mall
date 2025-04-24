import GeneralSettings from "./GeneralSettings";
import MenubarSettings from "./menubar/MenubarSettings";
import PagesSettings from "./pages/PagesSettings";


const SettingsSection2 = () => {

  return (
    <div className="h-full min-w-[400px] w-[25vw] bg-blue-800 p-3 overflow-y-auto">
      <h3 className="text-white font-semibold text-sm mb-2">Settings</h3>
      <GeneralSettings />
      <MenubarSettings/>
      <PagesSettings />
    </div>
  );
};

export default SettingsSection2;
