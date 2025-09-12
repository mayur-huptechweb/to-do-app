import { Button } from "@/components/ui/button";

const SearchAndColumnToggle = ({ search, setSearch, visibleColumns, setVisibleColumns }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
      />
      <div className="flex space-x-2">
        {Object.keys(visibleColumns).map((col) => (
          <Button
            key={col}
            size="sm"
            variant={visibleColumns[col] ? "default" : "outline"}
            onClick={() =>
              setVisibleColumns({
                ...visibleColumns,
                [col]: !visibleColumns[col],
              })
            }
          >
            {col.charAt(0).toUpperCase() + col.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndColumnToggle;
