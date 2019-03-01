import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row } from 'reactstrap'
import { syncAccount } from '../store/actions'
import { accounts } from '../store/accounts'
import { walletContract } from '../setup'
import { ROUTE_WALLET } from '../App'
import { ErrorMessage } from './errorMessage'

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col/>
                        <Col>
                            <Form>
                                <br/>
                                <Label>Login</Label>
                                <hr/>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                                        <Input placeholder="username" 
                                            value={this.state.username}
                                            onChange={(e) => this.setState({...this.state, username: e.target.value})}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <Input placeholder="password" type="password" 
                                            value={this.state.password} 
                                            onChange={(e) => this.setState({...this.state, password: e.target.value})}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Button color="secondary" onClick={() => this.props.login(this)}>Login</Button>{' '}
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col/>
                    </Row>
                    <br/>
                    <ErrorMessage message={this.state.errorMessage}/>
                    <br/>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state.account
}

const mapDispatchToProps = dispatch => {
    return {
        login: async (self) => {
            try {
                const username = self.state.username
                const account = accounts.find((acc) => acc.username === username)
                if (account) {
                    const balance = await walletContract.methods.balance(account.address).call()
                    account.balance = balance
                    dispatch(syncAccount(account))
                    self.props.history.push(ROUTE_WALLET)
                } else {
                    errorMessage(self, 'Account ' + username + ' not found')
                }
            } catch (e) {
                errorMessage(self, 'There was a system error while doing the login.')
                console.log(e)
            }
        }
    }
}

function errorMessage(self, message) {
    self.setState({
        ...self.state,
        errorMessage: message,
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)