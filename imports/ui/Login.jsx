/* eslint-disable no-unused-vars */
import { Accounts } from 'meteor/accounts-base';
import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import {Button} from 'react-bootstrap';
/* eslint-enable no-unused-vars */

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailLogin: "",
      passwordLogin:"",
      emailSignUp:"",
      passwordSignUp:"",
      rePasswordSignUp:""
    };
    this.login = this.login.bind(this);
    this.loginOut = this.loginOut.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  login()
  {
    console.log('login');
    Meteor.loginWithPassword({email: this.state.emailLogin}, this.state.passwordLogin, function(err)
    {
      if(err)
      {
        console.log(err);
      }
    });
  }
  loginOut()
  {
    Meteor.logout(function(err)
    {
      if(err)
      {
        console.log(err);
      }
    });
  }
  signUp()
  {
    console.log('signUp');
    if(this.state.passwordSignUp == this.state.rePasswordSignUp)
    {
      Accounts.createUser({email: this.state.emailSignUp, password: this.state.passwordSignUp},function(err)
      {
        if(err)
        {
          window.alert(err.reason);
        }
      });
    }
    else
    {
      window.alert("Las contraseñas no coinciden");
    }
  }
  handleChange(event) {
    if(event.target.name == "email")
    {
      this.setState({emailLogin: event.target.value});
    }
    if(event.target.name == "password")
    {
      this.setState({passwordLogin: event.target.value});
    }
    if(event.target.name == "emailSignUp")
    {
      this.setState({emailSignUp: event.target.value});
    }
    if(event.target.name == "passwordSignUp")
    {
      this.setState({passwordSignUp: event.target.value});
    }
    if(event.target.name == "rePasswordSignUp")
    {
      this.setState({rePasswordSignUp: event.target.value});
    }
  }
  render() {
    return (
      <div className='container-fluid'>
        <div className="row login-form">
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <h2>Inicia Sesión:</h2>
            <form>
              <div className="row">
    						<div className="col-sm-12 col-md-10  col-md-offset-1 ">
    							<div className="form-group">
    								<div className="input-group">
    									<span className="input-group-addon">
    										<i className="glyphicon glyphicon-user"></i>
    									</span>
    									<input className="form-control" placeholder="Email" type="email" name='email'
                        value={this.state.value} onChange={this.handleChange}></input>
    								</div>
    							</div>
    							<div className="form-group">
    								<div className="input-group">
    									<span className="input-group-addon">
    										<i className="glyphicon glyphicon-lock"></i>
    									</span>
    									<input className="form-control" placeholder="Contraseña" type="password" name='password'
                        value={this.state.passwordLogin} onChange={this.handleChange}></input>
    								</div>
    							</div>
    							<div className="form-group">
    								  <Button bsStyle="primary" onClick={this.login}>Ingresar</Button>
                      <Button bsStyle="primary" onClick={this.loginOut}>Cerrar Sesión</Button>
    							</div>
    						</div>
    					</div>
            </form>
          </div>
          <div className='col-md-4'></div>
    		</div>

        <div className="row login-form">
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <h2>Regístrate::</h2>
            <form>
              <div className="row">
                <div className="col-sm-12 col-md-10  col-md-offset-1 ">
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="glyphicon glyphicon-user"></i>
                      </span>
                      <input className="form-control" placeholder="Email" type='email' name="emailSignUp"
                        value={this.state.emailSignUp} onChange={this.handleChange}></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="glyphicon glyphicon-lock"></i>
                      </span>
                      <input className="form-control" placeholder="Contraseña" name="passwordSignUp" type='password'
                        value={this.state.passwordSignUp} onChange={this.handleChange}></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="glyphicon glyphicon-lock"></i>
                      </span>
                      <input className="form-control" placeholder="Confirma Contraseña" name="rePasswordSignUp" type='password'
                        value={this.state.rePasswordSignUp} onChange={this.handleChange}></input>
                    </div>
                  </div>
                  <div className="form-group">
                      <Button bsStyle="primary" onClick={this.signUp}>Regístrarse</Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    );
  }
}
