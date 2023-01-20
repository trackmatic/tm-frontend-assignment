import { useState } from "react";
import Select from "react-select";
import { statuses } from "./config";
import { FormFieldContainer, ModalContainer } from "./styles";

const RouteModal = ({ route, onSubmit }) => {
  const [data, setData] = useState(route);
  const isAdding = !route.id;
  const onChange = (name) => (e) =>
    setData((prev) => ({ ...prev, [name]: e.target.value }));
  return (
    <ModalContainer>
      <h3>{isAdding ? "Add" : "Edit"} Route</h3>
      <FormFieldContainer>
        <div>Reference *</div>
        <input value={data.reference} onChange={onChange("reference")} />
      </FormFieldContainer>
      {!isAdding && (
        <FormFieldContainer>
          <div>Status *</div>
          <Select
            value={statuses.find((s) => s.value === data.status)}
            options={statuses}
            onChange={(e) => {
              onChange("status")({ target: { value: e.value } });
            }}
          />
        </FormFieldContainer>
      )}
      <button
        disabled={!data.reference || !data.status}
        onClick={() => {
          onSubmit(data);
        }}
      >
        {isAdding ? "Add" : "Edit"}
      </button>
    </ModalContainer>
  );
};

export default RouteModal;
