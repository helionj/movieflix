import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import Movies from 'pages/Movie';
import MovieDetails from 'pages/MovieDetails';
import { Route, Router, Switch } from 'react-router-dom';
import history from 'util/history';

const Routes = () => (
  <Router history={history}>
    <Navbar/>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/movies" exact>
        <Movies/>
      </Route>
      <Route path="/movies/:movieId/reviews">
        <MovieDetails/>
      </Route>
    </Switch>
  </Router>
);

export default Routes;
