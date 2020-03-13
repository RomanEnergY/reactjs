import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {updateStatus} from "../../../../redux/ProfileReducer";
import PreloaderMini from "../../../common/preloader/PreloaderMini";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        statusText: this.props.status.data
    };

    activateEditMode = () => {
        if (`${this.props.status.userId}` === `${this.props.authId}`) {
            this.setState({
                editMode: true,
                statusText: this.props.status.data
            });
        }
    };

    deActivateEditMode = () => {
        this.setState({
            editMode: false
        });

        if (this.state.statusText !== this.props.status.data)
            this.props.updateStatus(this.state.statusText);
    };

    onChangeStatus = (e) => {
        this.setState({
            statusText: e.currentTarget.value
        });
    };

    render() {
        return <div>
            <span onDoubleClick={this.activateEditMode}>status:
                {this.props.status.fetching
                    ? <PreloaderMini/>
                    : !this.state.editMode
                        ? <span onDoubleClick={this.activateEditMode}>{` ${this.props.status.data || '---'}`}</span>
                        : <input
                            autoFocus={true} // Вставка фокуса в компонент
                            onChange={this.onChangeStatus}
                            onBlur={this.deActivateEditMode}
                            value={this.state.statusText}/>
                }
            </span>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.profilePage.status,
        authId: state.auth.data.id
    }
};

export default compose(
    connect(mapStateToProps, {updateStatus})
)(ProfileStatus);