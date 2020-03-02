import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: 'ProfileStatus - Hello',
        newPostElement: React.createRef()
    };

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    };

    deActivateEditMode = () => {
        this.setState({
            editMode: false
        })
    };

    onChangeStatus = () => {
        this.setState({
            status: this.state.newPostElement.current.value
        });
    };

    render() {
        return <div>
            status:
            <div>
                {!this.state.editMode
                    ? <span onDoubleClick={this.activateEditMode}>{this.state.status}</span>
                    : <input
                        autoFocus={true} // Вставка фокуса в компонент
                        onChange={this.onChangeStatus}
                        onBlur={this.deActivateEditMode}
                        ref={this.state.newPostElement}
                        value={this.state.status}/>
                }
            </div>
        </div>
    }
};

const mapStateToProps = (state) => {
    return {
        status: "ProfileStatus - Hello"
    }
};

export default compose(
    connect(mapStateToProps)
)(ProfileStatus);