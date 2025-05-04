import { getAnimationClass } from "../../../utils/helperFunctions";
import { getBackgroundStyles, getDisplayStyles, getTextStyles } from "../../../utils/stylingFunctions";

interface RecursiveRendererProps {
  settings: any;
}

const RecursiveRenderer = ({ settings }: RecursiveRendererProps) => {
  if (!settings) return null;
  const renderByDevice = (device: "mobile" | "tablet" | "desktop", className: string) => {
    const current = settings[device];
    if (!current) return null;
    return (
      <div
      className={`${className} ${getAnimationClass(current.animation || '')}`}
        style={{
          ...getDisplayStyles(current.display),
          ...getBackgroundStyles(current.background),
          ...getTextStyles(current.text),
        }}
      >
        {/* Render text items */}
        {(current.texts || []).map((textObj: any, index: number) => (
          <p
            key={`text-${index}`}
            style={{
              ...textObj?.display,
              ...getBackgroundStyles(textObj?.background),
              ...getTextStyles(textObj?.text),
            }}
            className={`${textObj.text?.animation}`}
          >
            {textObj?.text?.input || "Sample Text"}
          </p>
        ))}

        {/* Render buttons */}
        {(current.buttons || []).map((buttonObj: any, index: number) => (
          <button
            key={`button-${index}`}
            style={{
              ...buttonObj?.display,
              ...getBackgroundStyles(buttonObj?.background),
            }}
          >
            {buttonObj?.text?.input || "Click me"}
          </button>
        ))}

        {/* Render nested divs recursively */}
        {(current.divs || []).map((childDiv: any, index: number) => (
          <RecursiveRenderer key={`div-${index}`} settings={childDiv} />
        ))}
      </div>
    );
  };

  return (
    <>
      {renderByDevice("mobile", "md:hidden")}
      {renderByDevice("tablet", "hidden md:block lg:hidden")}
      {renderByDevice("desktop", "hidden lg:block")}
    </>
  );
};

export default RecursiveRenderer;
