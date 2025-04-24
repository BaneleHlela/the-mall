interface AddItemDropdownProps {
    open: boolean;
    onToggle: () => void;
    onSelect: (type: string) => void;
    options?: string[];
  }
  
  const defaultOptions = ['text', 'button', 'div', 'image', 'animation'];
  
  const AddItemDropdown = ({ open, onToggle, onSelect, options = defaultOptions }: AddItemDropdownProps) => {
    return (
      <div className="relative">
        <button
          onClick={onToggle}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Item
        </button>
  
        {open && (
          <div className="absolute mt-2 w-40 bg-white shadow-lg rounded border border-gray-200 z-10">
            {options.map((option) => (
              <button
                key={option}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => onSelect(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default AddItemDropdown;
  