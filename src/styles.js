import styled from "styled-components";
import { IoMdAddCircle } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const RowFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ expand }) => expand && "space-between"};
  gap: 1rem;
  padding: 1rem;
`;

const Add = styled(IoMdAddCircle)`
  color: #27ace3;
  cursor: pointer;
  font-size: 3rem;
`;

const OverflowContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const TablesContainer = styled(OverflowContainer)`
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const TableContainer = styled(OverflowContainer)`
  display: grid;
  grid-template-rows: auto 1fr;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  & table {
    border-collapse: collapse;
    width: 100%;
    font-size: 0.8rem;
  }
  & th,
  & td {
    text-align: left;
    padding: 0.4rem;
    border: 1px solid #ddd;
  }

  & th {
    background: #f5f5f5;
  }
`;

const TableHeading = styled(RowFlex)`
  border-left: 10px solid ${({ color }) => color};
  padding: 0.5rem;
  font-weight: bold;
  background: #ddd;
`;

const Edit = styled(CiEdit)`
  cursor: pointer;
  font-size: 1rem;
  color: #333;
`;

const ModalBack = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const FormFieldContainer = styled.div`
  margin: 1rem 0;
  width: 100%;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 1rem;
  z-index: 2;
  min-width: 300px;
  & input {
    border: none;
    border-bottom: 1px solid #ddd;
    width: 100%;
    height: 40px;
    padding: 0.5rem;
  }
  & button {
    border: none;
    border-radius: 4px;
    padding: 1rem;
    min-width: 80px;
    background: #27ace3;
    :disabled {
      background: #eee;
    }
    font-weight: bold;
    color: white;
    cursor: pointer;
  }
`;

export {
  Container,
  RowFlex,
  Add,
  FormFieldContainer,
  TablesContainer,
  TableContainer,
  TableHeading,
  OverflowContainer,
  Edit,
  ModalBack,
  ModalContainer,
};
