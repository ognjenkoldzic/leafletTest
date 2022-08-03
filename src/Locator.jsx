import { useMapEvents } from "react-leaflet";

function Locator() {
  const map = useMapEvents({
    click: () => {
      map.locate({
        //setView: true,
        //watch: true,
      });
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
  });

  return null;
}
export default Locator;
