import { Fragment, useEffect, useState } from "react";
import uniqid from "uniqid";
import { statuses } from "./config";
import RouteModal from "./RouteModal";
import {
  Add,
  Container,
  Edit,
  ModalBack,
  OverflowContainer,
  RowFlex,
  TableContainer,
  TableHeading,
  TablesContainer,
} from "./styles";

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
