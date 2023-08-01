import TableOperations from "src/ui/TableOperations";
import Filter from "src/ui/Filter";
import SortBy from "src/ui/SortBy";

const options = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "no-discount",
    label: "No discount",
  },
  {
    value: "with-discount",
    label: "With discount",
  },
];
const sortOption = [
  {
    value: "name-asc",
    label: "Sort by name (A-Z)",
  },
  {
    value: "name-desc",
    label: "Sort by name (Z-A)",
  },
  {
    value: "regularPrice-asc",
    label: "Sort by price (low)",
  },
  {
    value: "regularPrice-asc",
    label: "Sort by price (high)",
  },
  {
    value: "maxCapacity-asc",
    label: "Sort by capacity (low)",
  },
  {
    value: "maxCapacity-asc",
    label: "Sort by capacity (high)",
  },
];

const CabinsTableOperations = () => {
  return (
    <TableOperations>
      <Filter filterField="discount" options={options} />
      <SortBy options={sortOption} />
    </TableOperations>
  );
};

export default CabinsTableOperations;
