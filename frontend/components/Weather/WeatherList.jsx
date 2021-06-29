import Weather from "./Weather";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    listStyle: "none",
    display: "flex",
    padding: 0,
    margin: 0,
  },
});

export default function WeatherList({ cities }) {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <ul className={classes.list}>
          {cities.map((city, index) => (
            <li key={index}>
              <Weather city={city.name} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
