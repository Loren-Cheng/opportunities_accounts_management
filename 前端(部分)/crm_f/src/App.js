import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import ListOpportunitiesComponent from "./components/ListOpportunitiesComponent";
import CreateOpportunityComponent from "./components/CreateOpportunityComponent";
import {ConfigProvider} from 'antd';
import zh_TW from 'antd/lib/locale/zh_TW';
import ListAccountsComponent from "./components/ListAccountsComponent";
import CreateAccountsComponent from "./components/CreateAccountsComponent";
import TestComponent from "./components/TestComponent";
import ReadOpportunityComponent from "./components/ReadOpportunityComponent";
import UpdateOpportunityComponent from "./components/UpdateOpportunityComponent";
import ReadAccountComponent from "./components/ReadAccountComponent";

function App() {
  return (
    <ConfigProvider locale={zh_TW}>
      <div>
        <HeaderComponent/>
        <Router>

          {/*<div>*/}
          <Switch>
            <Route path="/opportunities" exact component={ListOpportunitiesComponent}/>
            <Route path="/employees" exact component={ListEmployeeComponent}></Route>
            <Route path="/test" exact component={TestComponent}></Route>
            <Route path="/read-opportunity/:id" exact component={ReadOpportunityComponent}></Route>
            <Route path="/read-account/:id" exact component={ReadAccountComponent}></Route>
            <Route path="/update-opportunity/:id" exact component={UpdateOpportunityComponent}></Route>
            <Route path="/add-employee" exact component={CreateEmployeeComponent}></Route>
            <Route path="/add-opportunity" exact component={CreateOpportunityComponent}></Route>
            <Route path="/account" exact component={ListAccountsComponent}></Route>
            <Route path="/add-account" exact component={CreateAccountsComponent}></Route>
          </Switch>
        </Router>
        <FooterComponent/>
      </div>
    </ConfigProvider>
  );
}


export default App;

