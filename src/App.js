import { Fragment, useEffect, useState } from "react";
import {
  Add,
  Container,
  Edit,
  FormFieldContainer,
  ModalBack,
  ModalContainer,
  OverflowContainer,
  RowFlex,
  TableContainer,
  TableHeading,
  TablesContainer,
} from "./styles";
import Select from "react-select";
import uniqid from "uniqid";

const statuses = [
  { label: "Requested", value: "Requested", color: "orange" },
  { label: "Scheduled", value: "Scheduled", color: "steelblue" },
  { label: "Active", value: "Active", color: "turquoise" },
  { label: "Completed", value: "Completed", color: "purple" },
  { label: "Closed", value: "Closed", color: "green" },
  { label: "Cancelled", value: "Cancelled", color: "maroon" },
];

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

function App() {
  const [routes, setRoutes] = useState(
    JSON.parse(localStorage.getItem("ROUTES") || "[]")
  );
  const [editRoute, setEditRoute] = useState();

  useEffect(() => {
    localStorage.setItem("ROUTES", JSON.stringify(routes));
  }, [routes]);

  const onSubmit = (route) => {
    setRoutes((prev) => {
      if (route.id) {
        return prev.map((p) => (p.id === route.id ? route : p));
      }
      return [...prev, { ...route, id: uniqid("route_") }];
    });
    setEditRoute();
  };

  return (
    <Fragment>
      {editRoute && (
        <Fragment>
          <ModalBack onClick={() => setEditRoute()} />
          <RouteModal route={editRoute} onSubmit={onSubmit} />
        </Fragment>
      )}
      <Container>
        <RowFlex expand>
          <h1>Routes Dashboard</h1>
          <Add
            onClick={() => {
              setEditRoute({ id: "", reference: "", status: "Requested" });
            }}
          />
        </RowFlex>
        <TablesContainer>
          {statuses.map(({ label, color }) => {
            const theseRoutes = routes.filter(
              (route) => route.status === label
            );
            return (
              <TableContainer key={label}>
                <TableHeading color={color}>{label}</TableHeading>
                <OverflowContainer>
                  <table>
                    <thead>
                      <tr>
                        <th>Reference</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {theseRoutes.map((route) => {
                        return (
                          <tr key={route.id}>
                            <td>{route.reference}</td>
                            <td style={{ width: 5 }}>
                              <Edit onClick={() => setEditRoute(route)} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </OverflowContainer>
              </TableContainer>
            );
          })}
        </TablesContainer>
      </Container>
    </Fragment>
  );
}

export default App;
