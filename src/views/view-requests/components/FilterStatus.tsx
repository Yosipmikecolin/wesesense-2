import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const states = ["Positivo", "Negativo", "No recomendable", "Sin respuesta"];

interface FilterStatusProps {
  stateFilter: string;
  setStateFilter: Dispatch<SetStateAction<string>>;
}

const FilterStatus = ({ stateFilter, setStateFilter }: FilterStatusProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="bg-gray-200 text-gray-600">
          <Filter className="h-4 w-4" />
          Filtrar por estado
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {states.map((state) => (
          <DropdownMenuCheckboxItem
            key={state}
            checked={state === stateFilter}
            onCheckedChange={() =>
              setStateFilter((prev) => (prev !== state ? state : ""))
            }
          >
            {state}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterStatus;
