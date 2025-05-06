import MenubarSettings from "../../layouts/menubar/MenubarSettings";


const SettingsSection2 = () => {

  return (
    <div className="h-full min-w-[400px] w-[25vw] bg-blue-800 p-3 overflow-y-auto">
      <h3 className="text-white font-semibold text-sm mb-2">Settings</h3>
      <MenubarSettings/>
    </div>
  );
};

export default SettingsSection2;
