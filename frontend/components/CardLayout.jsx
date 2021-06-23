import { Typography, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 16,
  },
  contentWrapper: {
    paddingTop: 24,
  },
  category: {
    fontSize: 14,
  },
  title: {
    marginBottom: 20,
  },
});

export default function CardLayout({
  children,
  title = "Default Title",
  category = "Category",
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.contentWrapper}>
        <Typography
          className={classes.category}
          color='textSecondary'
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant='h5' component='h2' className={classes.title}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}
