import renderer from "react-test-renderer";
import ListItemComponent from "../ListItemComponent";

it("renders correctly", () => {
  const item = {
    id: 1,
    name: "Item",
    status: false,
  };
  const itemElement = renderer
    .create(<ListItemComponent item={item} />)
    .toJSON();

  expect(itemElement).toMatchSnapshot();
});
