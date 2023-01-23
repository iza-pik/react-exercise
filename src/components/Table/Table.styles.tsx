import styled from "styled-components/macro";

export const StyledTable = styled.div`
  background: rgba(144, 238, 144, 0.2);
  width: 45vw;
  max-height: calc(100vh - 200px);
  margin: 20px 100px;
  padding: 16px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 1em;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 179, 51, 0.6);
    outline: 1px solid slategrey;
  }
`;

export const StyledHeading = styled.h2`
  display: flex;
  justify-content: center;
  text-shadow: 4px 4px 10px lightgrey;
  margin: 40px 0;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const TableDropdownWrapper = styled(DropdownWrapper)`
  margin-left: 100px;
`;

export const ChartDropdownWrapper = styled(DropdownWrapper)`
  > select {
    width: 80px;
  }
  margin-bottom: 20px;
`;

export const StyledDropdown = styled.select`
  background: rgba(214, 255, 226, 0.6);
  width: 200px;
  border-radius: 10px;
  padding: 4px 8px;
`;

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
`;

export const StyledButton = styled.button`
  background-color: rgb(0, 179, 51);
  color: white;
  border: 1px solid slategray;
  border-radius: 10px;
  padding: 4px 8px;
  margin-right: 20px;
  :hover {
    background-color: rgba(0, 179, 51, 0.7);
  }
  :active {
    background-color: rgb(1, 120, 33);
  }
  :disabled {
    background-color: lightslategray;
    pointer-events: none;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  border-top: 1px solid black;
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > :nth-of-type(2n) {
    background: rgba(144, 238, 144, 0.4);
  }
`;

export const TableHeaderCell = styled.div`
  background: rgba(144, 238, 144, 0.4);
  font-weight: 600;
  padding: 4px;
`;

export const TableColumn = styled.div`
  padding: 2px;
`;

export const ChartSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 38vw;
  margin-top: 20px;
`;

export const InfoBox = styled.div`
  margin-top: 20px;
  padding: 8px;
  border: 2px solid rgba(0, 179, 51, 0.6);
  border-radius: 4px;
  width: fit-content;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
`;
