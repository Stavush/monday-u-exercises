import renderer from "react-test-renderer";
import AboutComponent from "../AboutComponent";

it("renders correctly", () => {
  const aboutElement = renderer.create(<AboutComponent />).toJSON();

  expect(aboutElement).toMatchSnapshot();
});
