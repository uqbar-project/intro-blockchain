import React, { Component } from 'react'
import { Alert } from 'reactstrap'

export class ErrorMessage extends Component {

    render() {
        return (
            this.props.message &&
                <Alert color="danger">
                {this.props.message}
                </Alert>
        )
    }

}