import Button from "src/ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "src/features/cabins/CabinTable";
import { useState } from "react";
import CreateCabinForm from "src/features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new Cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
