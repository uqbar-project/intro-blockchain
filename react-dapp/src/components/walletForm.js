import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row } from 'reactstrap'

import { ROUTE_HOME } from '../App'
import { txAccount, walletContract } from '../setup'
import { logout, syncAccount } from '../store/actions'
import { ErrorMessage } from './errorMessage'

class WalletForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            amount: 0,
            errorMessage: ''
        }
        if (!this.props.username) {
            this.props.history.push(ROUTE_HOME)
        }
    }

    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col>
                            <Form>
                                <br />
                                <b>User name</b><br />
                                <Label>{this.props.username}</Label>
                                <hr />
                                <b>Balance</b><br />
                                <Label>{this.props.balance}</Label>
                                <hr />
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                        <Input placeholder="amount"
                                            type="number"
                                            value={this.state.amount}
                                            onChange={(e) => this.setState({
                                                ...this.state,
                                                amount: e.target.value
                                            })} />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Button color="info" onClick={() => this.props.put(this.props, this.state.amount, this)}>Put</Button>{' '}
                                    <Button color="warning" onClick={() => this.props.withdraw(this.props, this.state.amount, this)}>Withdraw</Button>{' '}
                                    <Button color="secondary" onClick={() => this.props.logout(this)}>Logout</Button>{' '}
                                </FormGroup>
                            </Form>
                            <br />
                            <ErrorMessage message={this.state.errorMessage} />
                        </Col>
                    </Row>
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
        put: async (account, amount, self) => {
            try {
                await walletContract.methods.put(account.address, amount).send({ from: txAccount })
                await updateBalance({ ...account }, dispatch)
                initState(self)
            } catch (e) {
                handleError(e, self)
            }
        },
        withdraw: async (account, amount, self) => {
            try {
                await walletContract.methods.withdraw(account.address, amount).send({ from: txAccount })
                await updateBalance({ ...account }, dispatch)
                initState(self)
            } catch (e) {
                handleError(e, self)
            }
        },
        logout: (self) => {
            dispatch(logout())
            self.props.history.push(ROUTE_HOME)
        }
    }
}

async function updateBalance(account, dispatch) {
    const balance = await walletContract.methods.balance(account.address).call()
    account.balance = balance
    dispatch(syncAccount(account))
}

function handleError(e, self) {
    console.log('Error', e.message)
    self.setState({
        ...self.state,
        errorMessage: e.message,
    })
}

function initState(self) {
    self.setState({
        amount: 0,
        errorMessage: '',
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm)