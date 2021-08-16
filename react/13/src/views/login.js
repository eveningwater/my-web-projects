import { Component } from "react";
import Title from "../components/Title";
const formArr = [
    {
        type:"text",
        key:"email"
    },
    {
        type:"password",
        key:"password"
    }
]
export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginInfo:{
                email:"",
                password:""
            }
        }
    }
    onChange(key,event){
        const loginInfo = Object.assign({},this.state.loginInfo,{
            [key]:event.target.value
        })
        this.setState({
            loginInfo
        });
        console.log(this.state.loginInfo)
    }
    render(){
        const { loginInfo } = this.state;
        return(
            <form className="login-form">
                <Title>please login</Title>
                {
                    formArr.map((item,index) => (
                        <div className="form-control" key={item.key + index}>
                            <input type={item.type} className="input" value={loginInfo[item.key]} onChange={this.onChange.bind(this,item.key)} required/>
                            <label>
                                {
                                    item.key.split("").map((char,_index) => (
                                        <span style={{ transitionDelay: (50 * _index) + 'ms'}} key={char + _index}>{ char }</span>
                                    ))
                                }
                            </label>
                        </div>
                    ))
                }
                <div className="form-control">
                    <button type="button" className="btn">login</button>
                </div>
                <div className="form-control">
                    Don't have an account?
                    <a href="/" target="_blank" rel="noopener noreferrer">register</a>
                </div>
            </form>
        )
    }
}