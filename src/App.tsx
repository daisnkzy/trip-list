import { useState } from 'react';
import Stats from './components/Stats';
// const initialItems = [
//   { id: 1, description: 'Passports', quantity: 2, packed: false },
//   { id: 2, description: 'Socks', quantity: 12, packed: false },
//   { id: 3, description: 'bag', quantity: 1, packed: true },
// ];

interface Items {
  items: Prop[];
}

interface ItemsProps {
  items: Prop[];
  onDeleteItems: (id: number) => void;
  onToggleItems: (id: number) => void;
  onClearList: () => void;
}

interface FormProps {
  onAddItems: (item: Prop) => void;
}

interface ItemProps {
  item: Prop;
  onDeleteItems: (id: number) => void;
  onToggleItems: (id: number) => void;
}

interface Prop {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

const App = () => {
  const [items, setItems] = useState<Prop[]>([]);

  const handleAddItems = (item: Prop) => {
    setItems([...items, item]);
  };

  const handleDeleteItems = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };
  //使用map重新渲染来更新列表，而不是直接修改数据违反不变性。
  const handleToggleItems = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleClearList = () => {
    const confirmed = window.confirm('你确定要删除所有清单的内容吗？');
    if (confirmed) setItems([]);
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItems}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
};

const Logo = () => {
  return <h1>🏖️ Trip List</h1>;
};

const Form: React.FC<FormProps> = ({ onAddItems }) => {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tripItem = { description, quantity, packed: false, id: Date.now() };
    console.log(tripItem);
    onAddItems(tripItem);
    setDescription('');
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>您在旅行时需要什么？把它记下来🥰</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      {/* <input
        type="number"
        value={quantity}
        placeholder="个数"
        onChange={(e) => setQuantity(Number(e.target.value))}
      /> */}
      <input
        type="text"
        value={description}
        placeholder="物品..."
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>添加</button>
    </form>
  );
};

const PackingList: React.FC<ItemsProps> = ({
  items,
  onDeleteItems,
  onToggleItems,
  onClearList,
}) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
      <button onClick={onClearList}>全部清空</button>
    </div>
  );
};

const Item: React.FC<ItemProps> = ({ item, onDeleteItems, onToggleItems }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
};

// const Stats: React.FC<Items> = ({ items }) => {
//   if (!items.length)
//     return (
//       <div className="stats">
//         <em>出发前，把需要准备的物品列出来吧！🚀</em>
//       </div>
//     );

//   const numItem = items.length;
//   const numPacked = items.filter((item) => item.packed === true).length;
//   const percentage = Math.round((numPacked / numItem) * 100);

//   return (
//     <div className="stats">
//       <em>
//         {percentage === 100
//           ? '恭喜你，万事就绪，准备出发！'
//           : `${numItem}件事已添加至你的备忘单,已完成${numPacked}件，当前进度为
//         ${percentage}%`}
//       </em>
//     </div>
//   );
// };

export default App;
