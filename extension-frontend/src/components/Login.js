import React, { Component } from "react";
import AuthService from "../services/AuthService";
import RealtimeNotificationService from "../services/RealtimeNotificationService";
import NotificationService from "../services/NotifcationService";

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            token: null,
            isAuthenticated: false
        };
        this.add = this.add.bind(this);
        this.resetToken = this.resetToken.bind(this);
        this._authService = new AuthService();
        this._realtimeService = new RealtimeNotificationService();
        this._notificationService = new NotificationService();
        
    }

    changeInputValue(key, value) {
        this.setState({ [key]: value });
    }

    cleanInput() {
        this.setState({ token: null });
    }

    add(event) {
        event.preventDefault();
        this._authService.authenticate(this.state.token);
        this.setState({ isAuthenticated: true })
        this.cleanInput();
    }

    resetToken() {
        this._authService.logout(this.state.token);
        this.setState({ isAuthenticated: false })
    }

    componentDidMount() {
        const isAuthenticated = this._authService.isAuthenticated();
        if (isAuthenticated) {
            this._realtimeService.listen(
                "app", 
                this._authService.getToken(), 
                this._notificationService.notify)
        }
        this.setState({ isAuthenticated: isAuthenticated });
    }

    render() {
        return (
            <div className={`${this.state.isAuthenticated ? 'offset-2': '' }`}>
                { !this.state.isAuthenticated &&
                    <form clas="col-md-12">
                        <div className="form-group col-md-12"> 
                            <label for="">Token:</label>
                            <input type="text" value={this.state.token}
                                onChange={(event) => this.changeInputValue("token", event.target.value)}
                                className="form-control" />
                        </div>
                        <div className="form-group col-md-12">
                            <button className="btn btn-primary" onClick={this.add}>
                                Adicionar
                             </button>
                        </div>
                    </form>
                }

                { this.state.isAuthenticated &&
                    <div className="col-md-12 alert alert-success text-center">
                        <p>You are authenticated!!!</p>
                        <button className="btn btn-danger" onClick={this.resetToken}>Reset token</button>
                    </div>
                }
            </div>

        );
    }
}