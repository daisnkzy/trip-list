interface Items {
  items: Prop[];
}
interface Prop {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

const Stats: React.FC<Items> = ({ items }) => {
  if (!items.length)
    return (
      <div className="stats">
        <em>出发前，把需要准备的物品列出来吧！🚀</em>
      </div>
    );

  const numItem = items.length;
  const numPacked = items.filter((item) => item.packed === true).length;
  const percentage = Math.round((numPacked / numItem) * 100);

  return (
    <div className="stats">
      <em>
        {percentage === 100
          ? '恭喜你，万事就绪，准备出发！'
          : `${numItem}件事已添加至你的备忘单,已完成${numPacked}件，当前进度为
        ${percentage}%`}
      </em>
    </div>
  );
};

export default Stats;
//一个例子
