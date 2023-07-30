import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  AnimeListPage,
  AnimeDetailPage,
  CollectionListPage,
  CollectionDetailPage,
} from "./pages";
import { Body, Navbar } from "./components";
import CollectionProvider from "./context";

const App = () => {
  console.log("Render App");
  return (
    <Router>
      <Navbar />
      <Body>
        <Switch>
          <CollectionProvider>
            <Route path="/crunchingroll" exact component={AnimeListPage} />
            <Route path="/anime/:id" component={AnimeDetailPage} />
            <Route path="/collection" exact component={CollectionListPage} />
            <Route path="/collection/:name" component={CollectionDetailPage} />
          </CollectionProvider>
        </Switch>
      </Body>
    </Router>
  );
};

export default App;
