import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: 'ProfileStatus - Hello',
        newPostElement: React.createRef()
    };

    activateEditMode() {
        // debugger
        // this.state.editMode = true;
        // this.forceUpdate(); // Принудительно перересовать UI (так делать нельзя, только в крайних случаях)

        this.setState({
            editMode: true
        })
    };

    deActivateEditMode() {
        this.setState({
            editMode: false
        })
    };

    onChangeStatus() {
        this.setState({
            status: this.state.newPostElement.current.value
        });
    };

    render() {
        return <div>
            status:
            <div>
                {!this.state.editMode
                    ? <span onDoubleClick={this.activateEditMode.bind(this)}>{this.state.status}</span>
                    : <input
                        autoFocus={true} // Вставка фокуса в компонент
                        onChange={this.onChangeStatus.bind(this)}
                        onBlur={this.deActivateEditMode.bind(this)}
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