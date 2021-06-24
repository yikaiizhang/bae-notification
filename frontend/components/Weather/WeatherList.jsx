import { useCities } from "../../hooks";
import Weather from "./Weather";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

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

  if (isLoading) return <Skeleton variant='rect' width={800} height={90} />;
  if (isError) return <div>failed to load</div>;

  return (
    <Card className={classes.root}>
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
