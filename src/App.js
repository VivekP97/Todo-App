import ListItem from "./components/ListItem";

export default function App() {

  return (
    <>
      {/* Container for all the page content */}
      <div className="mt-3">
        <ListItem itemInfo={{title: 'Hello world', lastModifiedTime: new Date(), isChecked: false}}></ListItem>
      </div>
    </>
  );
}