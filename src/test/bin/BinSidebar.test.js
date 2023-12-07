import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BinSidebar from "../../components/Bin/BinSidebar";

//Mock BinNav
jest.mock("../../components/Bin/BinNav", () => () => (
  <div data-testid="mock-bin-nav">Mocked BinNav</div>
));

describe("Sidebar component", () => {
  test("When sidebar is rendered it renders BinNav", () => {
    render(<BinSidebar />);
    expect(screen.getByTestId("mock-bin-nav")).toBeInTheDocument();
  });
});
