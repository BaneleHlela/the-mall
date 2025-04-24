import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveLayoutConfig } from "../features/layouts/layoutSlice.ts";
import { LayoutConfig } from "../types/layoutTypes.ts"

const LayoutForm: React.FC = () => {
    const dispatch = useDispatch();
    const [layout, setLayout] = useState<LayoutConfig>({
        theme: "default",
        divs: [{ id: "1", content: "", styles: {}, type: "saleDiv" }],
        headerLayout: "basic",
        footerLayout: "basic",
        colors: { primary: "#000000", secondary: "#ffffff", accent: "#ff8a00" },
        customCSS: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(saveLayoutConfig(layout));
    };

    const handleDivChange = (index: number, field: string, value: string) => {
        const updatedDivs = layout.divs.map((div, i) =>
            i === index ? { ...div, [field]: value } : div
        );
        setLayout({ ...layout, divs: updatedDivs });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Theme Input */}
            <label>Theme:
                <input
                    type="text"
                    value={layout.theme}
                    onChange={(e) => setLayout({...layout, theme: e.target.value})}
                />
            </label><br/>

            {/* Header Layout Input */}
            <label>Header Layout:
                <input
                    type="text"
                    value={layout.headerLayout}
                    onChange={(e) => setLayout({...layout, headerLayout: e.target.value})}
                />
            </label><br/>

            {/* Footer Layout Input */}
            <label>Footer Layout:
                <input
                    type="text"
                    value={layout.footerLayout}
                    onChange={(e) => setLayout({...layout, footerLayout: e.target.value})}
                />
            </label><br/>

            {/* Colors Input */}
            <label>Primary Color:
                <input
                    type="color"
                    value={layout.colors?.primary || "#000000"}
                    onChange={(e) => setLayout({...layout, colors: {...layout.colors, primary: e.target.value}})}
                />
            </label><br/>

            <label>Secondary Color:
                <input
                    type="color"
                    value={layout.colors?.secondary || "#ffffff"}
                    onChange={(e) => setLayout({...layout, colors: {...layout.colors, secondary: e.target.value}})}
                />
            </label><br/>

            <label>Accent Color:
                <input
                    type="color"
                    value={layout.colors?.accent || "#ff8a00"}
                    onChange={(e) => setLayout({...layout, colors: {...layout.colors, accent: e.target.value}})}
                />
            </label><br/>

            {/* Custom CSS Input */}
            <label>Custom CSS:
                <textarea
                    value={layout.customCSS}
                    onChange={(e) => setLayout({...layout, customCSS: e.target.value})}
                />
            </label><br/>

            {/* Divs Input */}
            {layout.divs.map((div, index) => (
                <div key={div.id}>
                    <label>Div {index + 1} Content:
                        <input
                            type="text"
                            value={div.content}
                            onChange={(e) => handleDivChange(index, "content", e.target.value)}
                        />
                    </label>
                    <label>Div {index + 1} Styles:
                        <input
                            type="text"
                            placeholder="e.g., { color: 'red' }"
                            value={JSON.stringify(div.styles)}
                            onChange={(e) => handleDivChange(index, "styles", e.target.value)}
                        />
                    </label>
                </div>
            ))}

            <button type="submit">Save Layout</button>
        </form>
    );
};

export default LayoutForm;
