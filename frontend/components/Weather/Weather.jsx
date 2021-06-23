import { useWeather } from "../../hooks/useWeather";
import { celsiusToFahrenheit } from "../../lib/helpers";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  item: {
    padding: "0 32px",
  },
});

export default function Weather({ city }) {
  const classes = useStyles();
  const { weather, isLoading, isError } = useWeather(city);
  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>failed to load</div>;
  return (
    <div className={classes.item}>
      <Typography variant='h5' component='h2'>
        {city}
      </Typography>
      <Typography variant='body2' component='p'>
        {Math.ceil(weather.main.temp)}°C /{" "}
        {celsiusToFahrenheit(weather.main.temp)}°F
      </Typography>
    </div>
  );
}
