import { IControl } from '../../types/types';
import SideBarNode from './SideBarNode';

const controls: IControl[] = [
  {
    label: 'Start',
    nodeType: 'startNode',
    styledNode: { isCircle: true, borderColor: 'green' },
  },
  {
    label: 'Step',
    nodeType: 'stepNode',
  },
  {
    label: '???',
    nodeType: 'decisionNode',
    styledNode: { isDiamond: true },
  },
  {
    label: 'End',
    nodeType: 'endNode',
    styledNode: { isCircle: true, borderColor: 'red' },
  },
  {
    label: 'Comment',
    nodeType: 'commentNode',
    styledNode: { isFolded: true, borderColor: 'yellow' },
  },
];

const SideBar = () => {
  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      {controls.map((control, index) => (
        <SideBarNode key={index} {...control} />
      ))}
    </aside>
  );
};

export default SideBar;
