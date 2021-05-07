import './App.css';
import { Route, Switch, Redirect } from "react-router-dom";
import Posts from "./components/posts";
import Home from "./components/home";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";

function App() {
  return (
    <div className="containter-fluid">
      <Navbar />
      <div className="container">
        <div className="content">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/posts" component={Posts} />
            <Route path="/" exact component={Home} />
            <Route path="/not-found"  component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
