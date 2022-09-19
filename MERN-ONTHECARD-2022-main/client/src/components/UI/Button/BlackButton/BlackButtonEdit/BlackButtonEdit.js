import React, {Component} from 'react';
import classes from './BlackButtonEdit.module.css';


class BlackButtonEdit extends Component{
    render(){
        const buttonClasses = [classes.button];
        if(this.props.deleteButton){
            buttonClasses.push(classes.buttonRed); 
        } 
        
        return (
            <button className={buttonClasses.join(' ')} onClick={this.props.clicked}>
                <i className={this.props.iconClass}></i>
            </button>
        );
    }
}

export default BlackButtonEdit; 