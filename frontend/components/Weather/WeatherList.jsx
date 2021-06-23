import { useCities } from "../../hooks";
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

export default function WeatherList() {
  const classes = useStyles();

  const { cities, isLoading, isError } = useCities();

  if (isLoading) return <div>Is loading...</div>;
  if (isError) return <div>failed to load</div>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <ul className={classes.list}>
          {cities.map((city) => (
            <li>
              <Weather city={city.name} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
