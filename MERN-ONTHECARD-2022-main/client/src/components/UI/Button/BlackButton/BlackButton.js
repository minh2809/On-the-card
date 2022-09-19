import React, {Component} from 'react';
import classes from './BlackButton.module.css';


class BlackButton extends Component{
    render(){
        let buttonClasses = [classes.button]; 
        if(this.props.updateButton){
            buttonClasses.push(classes.updateButton);
        }
        return (
            <button className={buttonClasses.join(' ')} onClick={this.props.clicked}>
                <i className={this.props.iconClass}></i>
                {this.props.content}
            </button>
        );
    }
}

export default BlackButton; 