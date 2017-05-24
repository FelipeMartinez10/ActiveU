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
      rePasswordSignUp:"",
      showSignUp: false
    };
    this.login = this.login.bind(this);
    this.loginOut = this.loginOut.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showSignUpForm = this.showSignUpForm.bind(this);
    this.showLoginForm = this.showLoginForm.bind(this);
  }

  showSignUpForm()
  {
    this.setState(
      {
        showSignUp:true
      });
  }
  showLoginForm()
  {
    this.setState(
      {
        showSignUp:false
      });
  }
  login()
  {
    let self = this;
    Meteor.loginWithPassword({email: this.state.emailLogin}, this.state.passwordLogin, function(err)
    {
      if(err)
      {
        window.alert(err.reason)
      }
      else
      {
        self.context.router.push('/eventos');
      }
    },this);
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
    let self = this;
    if(this.state.passwordSignUp == this.state.rePasswordSignUp)
    {
      Accounts.createUser({email: this.state.emailSignUp, password: this.state.passwordSignUp},function(err)
      {
        if(err)
        {
          window.alert(err.reason);
        }
        else
        {
          self.context.router.push('/eventos');
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
    const showSignUp = this.state.showSignUp;
    return (
      <div className='container-fluid'>
        {(showSignUp)?
          <div className="row login-form">
            <div className='col-md-4'></div>
            <div className='col-md-4'>
              <h2>Regístrate:</h2>
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
                        <p>¿Tienes cuenta? <a onClick={this.showLoginForm} className='clickable'>Inicia Sesión</a></p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className='col-md-4'></div>
          </div>
          :
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
                          value={this.state.emailLogin} onChange={this.handleChange}></input>
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
                        <p>¿No tienes cuenta? <a onClick={this.showSignUpForm} className='clickable'>¡Regístrate!</a></p>
                        {/*<Button bsStyle="primary" onClick={this.loginOut}>Cerrar Sesión</Button>*/}
      							</div>
      						</div>
      					</div>
              </form>
            </div>
            <div className='col-md-4'></div>
      		</div>
        }
      </div>
    );
  }
}
Login.contextTypes = {
  router: React.PropTypes.object
}
