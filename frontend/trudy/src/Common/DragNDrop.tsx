import { useState } from "react";

interface Props {
  onBookmarkDrop: (bookmark: any) => void;
}

const DropComponent = ({ onBookmarkDrop }: Props) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const bookmarkData = event.dataTransfer.getData("application/json");
    const bookmark = JSON.parse(bookmarkData) as any;
    onBookmarkDrop(bookmark);
    setIsDragOver(false);
  };

  return (
    <div className={isDragOver ? "drop-area active" : "drop-area"} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      Drop bookmarks here
    </div>
  );
};

export default DropComponent;
