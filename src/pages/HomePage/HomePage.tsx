import { Button } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Operation } from "../../components/Operation/operation";
import { addMoney, addExpense, transferMoney, addActivity } from "../../redux/actions/money-actions";
import { logoutUser } from "../../redux/actions/user-actions";
import './HomePage.scss';
import { User } from '../../models/userModel';
import { Transfer } from '../../models/transferModel';

interface HomePageState {
  quantity: number,
  recipientUserId: string,
  myMoney: number
}

interface HomePageProps {
  users: User[];
  transfers: Transfer[];
  loggedUser: number;
  addMoney: (userId: number, quantity: number) => object;
  addExpense: (userId: number, quantity: number) => object;
  transferMoney: (userId: number, recipientId: number, quantity: number) => object;
  logoutUser: () => object;
  addActivity: (sender: number, quantity: number, recipient: number) => object;
}

class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      quantity: 0,
      recipientUserId: '',
      myMoney: this.props.users.find((user) => user.id === this.props.loggedUser)?.money || 0
    };
  }

  handleRecipientUser = (e: any) => this.setState({ recipientUserId: e.target.value });

  handleQuantity = (e: any) => { this.setState({ quantity: Number.parseInt(e.target.value) }) }

  handleDeposit = () => {
    this.props.addMoney(this.props.loggedUser, this.state.quantity);
    this.props.addActivity(this.props.loggedUser, this.state.quantity, this.props.loggedUser);
    this.setState({
      quantity: 0,
      myMoney: this.state.myMoney + this.state.quantity
    });
  };

  handleExpense = () => {
    this.props.addExpense(this.props.loggedUser, this.state.quantity);
    this.props.addActivity(this.props.loggedUser, -this.state.quantity, this.props.loggedUser);
    this.setState({
      quantity: 0,
      myMoney: this.state.myMoney - this.state.quantity
    });
  };

  handleLogout = () => {
    this.props.logoutUser();
  }

  handleTransfer = () => {
    this.props.transferMoney(this.props.loggedUser, Number.parseInt(this.state.recipientUserId), this.state.quantity,)
    this.props.addActivity(this.props.loggedUser, this.state.quantity, Number.parseInt(this.state.recipientUserId))
    this.setState({
      quantity: 0,
      recipientUserId: '',
      myMoney: this.state.myMoney - this.state.quantity
    });
  };


  render() {
    return (
      <div>
        <h1 className="welcome">Welcome {this.props.users.find((user) => user.id === this.props.loggedUser)?.username}!</h1>
        <div className="money-transfers-container">
          <div className="section-container"><h2>My money: {this.state.myMoney} $</h2></div>
          <div className="section-container transfers-container">
            <h2>Movements </h2>
            <div className="movements-container">
              {this.props.transfers.filter((transfer, index) => {
                return transfer.sender === this.props.loggedUser || transfer.recipient === this.props.loggedUser
              }).map((transfer, index) => {
                return <Operation key={index} loggedUser={this.props.loggedUser} users={this.props.users} senderId={transfer.sender}
                  quantity={transfer.quantity} recipientId={transfer.recipient} ></Operation>
              })}
            </div>
          </div>
        </div>
        <div className="section-container">
          <h2>Operations</h2>
          <div className="quantity-container">
            <input className="quantity-input"
              type="number"
              min="0"
              onChange={this.handleQuantity}
              placeholder={"quantity"}
              value={this.state.quantity || 0}
            />
          </div>
          <div>
            <h3>Add an Income or an Expense</h3>
            <div className="money-button-container">
              <Button className="button" disabled={!this.state.quantity} variant="contained" onClick={this.handleDeposit} color="primary"> ADD INCOME    </Button>
            </div>
            <div className="money-button-container">
              <Button disabled={this.state.quantity > this.state.myMoney || !this.state.quantity} variant="contained" onClick={this.handleExpense} color="secondary">ADD EXPENSE</Button></div>
            <h3>Transfer money to somebody</h3>
          </div>
          <select className="select-recipient" value={this.state.recipientUserId} onChange={this.handleRecipientUser}>
            <option className="option" value=''>Select a recipient</option>
            {this.props.users.map((user, index) => (
              this.props.loggedUser !== user.id && <option className="option" key={index} value={user.id}>{user.username}</option>
            ))}
          </select>
          <Button disabled={(this.state.quantity > this.state.myMoney) || (this.state.recipientUserId === '') || (!this.state.quantity)} onClick={this.handleTransfer} variant="contained" color="primary">TRANSFER</Button>
        </div>
        <Button variant="contained" onClick={this.handleLogout} color="secondary"> Logout</Button>
      </div>
    );
  }
}

const MapStateToProps = (store: any) => {
  return {
    users: store.userReducer.users,
    loggedUser: store.userReducer.loggedUser,
    transfers: store.transferReducer.transfers
  };
};

const MapDispatchToProps = {
  addMoney,
  addExpense,
  transferMoney,
  logoutUser,
  addActivity
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(HomePage);