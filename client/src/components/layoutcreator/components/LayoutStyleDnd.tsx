import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../../../app/store';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice';

const ItemType = 'LAYOUT_ITEM';

interface DragItemProps {
  id: string;
  index: number;
  moveItem: (from: number, to: number) => void;
}

const DraggableItem: React.FC<DragItemProps> = ({ id, index, moveItem }) => {
  const [, dragRef] = useDrag({
    type: ItemType,
    item: { id, index },
  });

  const [, dropRef] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveItem(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className="cursor-move bg-white border border-gray-300 rounded px-4 py-2 shadow-sm"
    >
      {id}
    </div>
  );
};

const LayoutStyleDnD = () => {
  const dispatch = useDispatch();
  const layoutStyle = useSelector(
    (state: RootState) => state.layoutSettings.menubar.layoutStyle
  );

  const moveItem = useCallback(
    (fromIndex: number, toIndex: number) => {
      const updated = [...layoutStyle];
      const [removed] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, removed);
      dispatch(updateSetting({ field: 'menubar.layoutStyle', value: updated }));
    },
    [layoutStyle, dispatch]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex space-x-4 p-2 bg-gray-50 rounded-md">
        {layoutStyle.map((item, index) => (
          <DraggableItem key={item} id={item} index={index} moveItem={moveItem} />
        ))}
      </div>
    </DndProvider>
  );
};

export default LayoutStyleDnD;