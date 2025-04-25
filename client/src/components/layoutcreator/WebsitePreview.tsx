import { RootState } from "../../app/store.ts";
import Menubar from "../storecomponents/Menubar.tsx";
import { useSelector } from 'react-redux';



const WebsitePreview = () => {
  const settings = useSelector((state: RootState) => state.layoutSettings);


  console.log(settings)
  return (
    <div>
      <Menubar layoutId={"6673c79d11b1ab3dde43957b9"}/>
    </div>
  );
};

export default WebsitePreview;
