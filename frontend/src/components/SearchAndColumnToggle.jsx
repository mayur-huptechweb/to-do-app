import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";

const SearchAndColumnToggle = ({
  search,
  setSearch,
  visibleColumns,
  setVisibleColumns,
}) => {
  const [selectedColumns, setSelectedColumns] = useState(
    Object.keys(visibleColumns).filter((col) => visibleColumns[col])
  );

  const handleColumnToggle = (col) => {
    let updated;
    if (selectedColumns.includes(col)) {
      updated = selectedColumns.filter((c) => c !== col);
    } else {
      updated = [...selectedColumns, col];
    }
    setSelectedColumns(updated);

    // update parent state
    const newVisibility = {};
    Object.keys(visibleColumns).forEach((key) => {
      newVisibility[key] = updated.includes(key);
    });
    setVisibleColumns(newVisibility);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs bg-white px-4 py-2 border rounded-lg shadow-sm flex-1"
      />

      {/* Multi-select Dropdown */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-52 justify-between">
            {selectedColumns.length > 0
              ? `${selectedColumns.length} column(s) selected`
              : "Select columns"}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0">
          <Command>
            <CommandInput placeholder="Search columns..." />
            <CommandEmpty>No column found.</CommandEmpty>
            <CommandGroup>
              {Object.keys(visibleColumns).map((col) => (
                <CommandItem
                  key={col}
                  onSelect={() => handleColumnToggle(col)}
                  className="flex items-center justify-between"
                >
                  <span>{col.charAt(0).toUpperCase() + col.slice(1)}</span>
                  {selectedColumns.includes(col) && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchAndColumnToggle;
